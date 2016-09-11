//g3
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.g3 = global.g3 || {})));
}(this, function (exports) { 'use strict';

    function select (selector) {
        return typeof selector === "string"? document.querySelector(selector): selector;
    }

    function width (width) {
        if(!arguments.length) {
            return this._width;
        }
        
        this._width = width;

        return this;
    }

    function height (height) {
        if(!arguments.length) {
            return this._height;
        }
        this._height = height;

        return this;
    }

    function render () {
        //clearTimeout(this._renderDelay);
        //this._renderDelay = setTimeout(function(){
            this._init();
            this._draw();
        //}.bind(this),0);

            return this;

    }

    function data (data) {
        if(!arguments.length){
            return data;
        }
        this._data = data;
        return this;
    }

    function toArray (maybeArr) {
        if(!Array.isArray(maybeArr)) maybeArr = [maybeArr];
        return maybeArr;
    }

    function nodes (nodes, cover) {
        nodes = toArray(nodes);

        if(!arguments.length){
            return this._nodes;
        }

        if(cover){
            this.clearNodes();
        }

        nodes.forEach(function(v){
            this.addNode(v);
        },this);

        this.render();
        
        return this;
    }

    function getIds (array) {
        return array.map(function(item){
            if(typeof item  ===  'object') return item.id;
            else return item;
        });
    }

    //filter array of object which has id; filtered by id, or id array, or object that has id, or object array
    //this function is convenient to Nodes or Links data.
    function filterBy (filter, objArray) {
        if(typeof filter === "function"){
            var filtered = filter;
        }else{
            var ids = getIds(toArray(filter));

            filtered = function(v){
                return ids.indexOf(v.id) !== -1;
            };
        }
        return objArray.filter(filtered);
    }

    function getNodes (filter) {
        return filterBy(filter, this._nodes);
    }

    function getRenderedNodes () {
        return this.getNodes(function(Node){
            return !Node._transformed;
        });
    }

    //中文为2长度，非中文为1

    function getStrLen (str) {
        var len = 0;
        if (typeof str !== "string") {
            str = str.toString();
        }
        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) > '~') {
                len += 2;
            } else {
                len++;
            }
        }
        return len;
    };

    function selected (selected) {
        if(!arguments.length) return this._selected;

        this._selected = selected;
        d3.select(this._element).classed("selected", selected);

        return this;
    }

    function transformToLink () {
        this._transformed = true;
    }

    function nudge (nudgeX, nudgeY) {
        this.x += nudgeX;
        this.y += nudgeY;
    }

    function color (color) {
        if(!arguments.length) return this._color || "#123456";

        this._color = color;
        graph.render();

        return this;
    }

    function size (diameter) {
        if(!arguments.length) return this._size;

        this._size = diameter;
        graph.render();

        return this;
    }

    function label (label) {
        if(!arguments.length) return this._label || "No label";

        this._label = label;
        graph.render();

        return this;
    }

    //data: data obj, graph: graphInstance
    function Node(data, graph) {
        this.id = data.id;
        this._label = data.label;
        this.x = data.x;
        this.y = data.y;
        this._size = data.size || graph._nodeSize;
        this._color = data.color;
        this._selected = false; //indicate whether node is select
    }

    Node.prototype = {
        constructor: Node,
        selected: selected,
        transformToLink: transformToLink,
        nudge: nudge,
        getId: function () {
            return this.id;
        },
        getX: function(){
            return this.x;
        },
        getY: function () {
            return this.y;
        },
        label: label,
        getLabelWidth: function(){
            return getStrLen(this.label()) * 9;
        },
        color: color,
        size: size,
        getTranslate: function () {
            return "translate(" + this.x + "," + this.y + ")";
        }

    };

    function addNode (obj) {
        var node = new Node(obj, this);
        if(!this.hasNode(node)) this._nodes.push(node);
    }

    function hasNode (node) {
        var ids = this._nodes.map(function(d){return d.id});

        return ids.indexOf(node.id) !== -1;
    }

    //nodes could be: Node, [Node], Node id string, Node id array of string
    function removeNodes (nodes) {

        //remove links first
        this._removeLinksByNodes(nodes);

        this.getNodes(nodes).forEach(function(Node){
            this._nodes.splice(this._nodes.indexOf(Node), 1);
        }, this);

        this.render();

    }

    function clearNodes () {
        this._nodes = [];
    }

    function links (links, cover) {
        links = toArray(links);

        if(!arguments.length){
            return this._links;
        }

        if(cover){
            this.clearLinks();
        }

        links.forEach(function(v){
            this.addLink(v);
        },this);

        this.render();
        
        return this;
    }

    function getLinks (filter) {
        return filterBy(filter, this._links);
    }

    function getRenderedLinks () {
        return this.getLinks(function(Link){
           return !Link._transformed;
        });
    }

    //nodes could be: Node, [Node], Node id string, Node id array of string
    function getLinksByNodes (nodes) {
        var removedNodes = this.getNodes(nodes);
        return this._links.filter(function (Link) {
            return  (removedNodes.indexOf(Link.source) !== -1) || (removedNodes.indexOf(Link.target) !== -1);
        });
    }

    function getNodeById (id, Nodes) {
        return Nodes.filter(function(d){
            return d.id === id;
        })[0];
    }

    //Link has source and target Node in _nodes
    function hasST () {
        return (this.source !== undefined) && (this.target !== undefined);
    }

    function getOffsetCoordinate (Xs, Ys, Xd, Yd, offsetS, offsetD) {
        var l = Math.sqrt((Xd - Xs) * (Xd - Xs) + (Yd - Ys) * (Yd - Ys));
        var sin = (Yd - Ys) / l;
        var cos = (Xd - Xs) / l;

        return {
            Xs: Xs + offsetS * cos || Xs,
            Ys: Ys + offsetS * sin || Ys,
            Xd: Xd - offsetD * cos || Xd,
            Yd: Yd - offsetD * sin || Yd
        }
    }

    function getCoordination () {

        var sourceR = this.source.size() / 2;
        var targetR = this.target.size() / 2;
        var arrowSize = 10;

        var Xs = this.source.x + sourceR,
            Ys = this.source.y + sourceR,
            Xd = this.target.x + targetR,
            Yd = this.target.y + targetR;


        var offset = getOffsetCoordinate(Xs, Ys, Xd, Yd, sourceR + arrowSize, targetR + arrowSize);


        if(this.hasSourceArrow()){
            Xs = offset.Xs;
            Ys = offset.Ys;
        }
        if(this.hasTargetArrow()){
            Xd = offset.Xd;
            Yd = offset.Yd;
        }

        return {
            Sx: Xs,
            Sy: Ys,
            Tx: Xd,
            Ty: Yd
        };
    }

    const DIRECTION = {
        NONE: 0,
        FROM: 1,
        TO: 2,
        DOUBLE: 3
    };

    function getStartArrow () {
        if(this.direction === DIRECTION.TO || this.direction === DIRECTION.DOUBLE){
            return "url(" + window.location.href.split('#')[0] + "#start-arrow)";
        }
    }

    function getEndArrow () {
        if(this.direction === DIRECTION.FROM || this.direction === DIRECTION.DOUBLE){
            return "url(" + window.location.href.split('#')[0] + "#end-arrow)";
        }
    }

    function getTextCenter () {
        var coord = this.getCoordination();

        // if(this.direction === DIRECTION.TO || this.direction === DIRECTION.DOUBLE){
        //     Xs = offset.Xs;
        //     Ys = offset.Ys;
        // }
        // if(this.direction === DIRECTION.FROM || this.direction === DIRECTION.DOUBLE){
        //     Xd = offset.Xd;
        //     Yd = offset.Yd;
        // }

        var x = Math.abs(coord.Sx - coord.Tx);
        var y = Math.abs(coord.Sy - coord.Ty);
        var z = Math.sqrt(x * x + y * y);
        var charLength = getStrLen(this.label()) * 6 / 2;
        //字长度
        return z / 2 - charLength;
    }

    function getLinkLabelTransform (scaleFactor) {
        var coord = this.getCoordination();
        var rx = (coord.Sx + coord.Tx) / 2;
        var ry = (coord.Sy + coord.Ty) / 2;

        if (coord.Xd < coord.Xs) {
            return 'rotate(180 ' + rx + ' ' + ry + ') translate(' + rx + ' ' + ry + ') scale(' + 1 / scaleFactor + ') translate(' + -rx + ' ' + -ry + ')';
            //先移动原点到字体位置，然后进行缩放，在将原点移回到初始位置
        } else {
            return 'translate(' + rx + ' ' + ry + ') scale(' + 1 / scaleFactor + ') translate(' + -rx + ' ' + -ry + ')';
        }
    }

    function transformToLink$1 () {
        this._transformed = true;
    }

    function label$1 (label) {
        if(!arguments.length) return this._label || "No label";

        this._label = label;
        graph.render();

        return this;
    }

    function Link(data, nodes) {
        this.id = data.id;
        this._label = data.label;
        this.src = data.src;
        this.dst = data.dst;
        this.direction = data.direction === undefined? 1: data.direction;//0: none, 1: from, 2: to, 3 double

        this.source = getNodeById(this.src, nodes);
        this.target = getNodeById(this.dst, nodes);
    }

    Link.prototype = {
        constructor: Link,
        hasST: hasST,
        transformToLink: transformToLink$1,
        getCoordination: getCoordination,
        getStartArrow: getStartArrow,
        getEndArrow: getEndArrow,
        getTextCenter: getTextCenter,
        getLinkLabelTransform: getLinkLabelTransform,
        label: label$1,
        hasSourceArrow: function(){
            return this.direction === DIRECTION.TO || this.direction === DIRECTION.DOUBLE;
        },
        hasTargetArrow: function(){
            return this.direction === DIRECTION.FROM || this.direction === DIRECTION.DOUBLE;
        },
        getId: function () {
            return this.id;
        },
    };

    function addLink (obj) {
        var link = new Link(obj, this._nodes);
        if(!this.hasLink(link) && link.hasST()) this._links.push(link);
    }

    function hasLink (link) {
        var ids = this._links.map(function(d){return d.id});

        return ids.indexOf(link.id) !== -1;
    }

    //links could be: Link, [Link], Link id string, Link id array of string
    function removeLinks (links) {
        this.getLinks(links).forEach(function(Link){
            this._links.splice(this._links.indexOf(Link), 1);
        }, this);
        
        this.render();
    }

    //nodes could be: Node, [Node], Node id string, Node id array of string
    function removeLinksByNodes (nodes) {
        this.getLinksByNodes(nodes).map(function (Link) {
            this._links.splice(this._links.indexOf(Link), 1);
        }, this);

    }

    function clearLinks () {
        this._links = [];
    }

    function appendPreDefs () {
        let str = '<defs>'+
                            '<filter id="shadow" x="-20%" y="-20%" width="200%" height="200%" type="Shadow" shadowoffsetx="5" shadowoffsety="5" shadowblur="5" shadowcolor="rgba(0,0,0)">' +
                                '<feOffset result="offOut" in="SourceGraphic" dx="0" dy="3"></feOffset>' +
                                '<feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"></feColorMatrix>' +
                                '<feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>' +
                                '<feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>' +
                            '</filter>' +
                            '<marker id="start-arrow" viewBox="0 -5 10 10" refX="10" markerWidth="3" markerHeight="3" orient="auto"><path d="M10,-5L0,0L10,5"></path></marker>' +
                            '<marker id="end-arrow" viewBox="0 -5 10 10" refX="0" markerWidth="3" markerHeight="3" orient="auto"><path d="M0,-5L10,0L0,5"></path></marker>' +
                            '<marker id="end-arrow-hover" viewBox="0 -5 10 10" refX="0" markerWidth="3" markerHeight="3" orient="auto"><path d="M0,-5L10,0L0,5"></path></marker>' +
                            '<marker id="end-arrow-selected" viewBox="0 -5 10 10" refX="0" markerWidth="3" markerHeight="3" orient="auto"><path d="M0,-5L10,0L0,5"></path></marker>' +
                            '<radialGradient id="linear" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">' +
                                '<stop offset="0%" style="stop-color:rgb(255，255,255);stop-opacity:0" />' +
                                '<stop offset="90%" style="stop-color:rgb(255,255,255);stop-opacity:1" />' +
                                '<stop offset="98%" style="stop-color:rgb(255,255,255);stop-opacity:1" />' +
                                '<stop offset="100%" style="stop-color:rgb(222，222, 222);stop-opacity:1" />' +
                            '</radialGradient>' +
                    '</defs>';

        this._svg.insertAdjacentHTML("afterbegin", str);
    }

    function appendPreElement () {
        var svg = this._getSvgSelection();
        this._brushSelection = svg.append("g").attr("class", "brush");

        var forceGroup = this._forceGroupSelection = svg.append('g').attr('class', 'force');
        
        forceGroup.append("g").attr("class", "paths");
        forceGroup.append("g").attr("class", "link-labels");
        forceGroup.append("g").attr("class", "nodes");
    }

    function Zoom() {
        return d3.zoom().scaleExtent([0.1, 2.2])
            .on('start', function () {
            })
            .on("zoom", this._zoomed.bind(this))
            .on('end', function () {
            });
    }

    function Brush () {
        var self = this;
        var brush = d3.brush()
            .extent([[0, 0], [500, 500]])
            .on('start', function () {
                if (!d3.event.selection) return; // Ignore empty selections.
                
                self._getNodesSelection().each(function (Node) {
                    Node.pselected = d3.event.sourceEvent.ctrlKey && Node.selected();
                });
            })
            .on('brush', function () {
                if (!d3.event.selection) return; // Ignore empty selections.

                var extent = d3.event.selection;
                var t = self._getCurrentTransform();

                self._getNodesSelection().each(function(Node){
                    Node.selected(Node.pselected ^ ( (extent[0][0] - t.x) / t.k  <= Node.getX() && Node.getX() < (extent[1][0] - t.x) / t.k  && (extent[0][1] - t.y) / t.k <= Node.getY() && Node.getY() < (extent[1][1] - t.y) / t.k ));
                });

            })
            .on('end', function () {
                if (!d3.event.selection) return; // Ignore empty selections.
                self._getBrushSelection()
                    .call(brush.move, null);
            });

        brush.show = function(){
            self._getBrushSelection().style('display', 'block');
        };
        brush.hide = function(){
            self._getBrushSelection().style('display', 'none');
        };

        return brush;
    }

    function DragNode () {
        var self = this;
        var drag = d3.drag()
            .on("start", function (Node) {
                d3.event.sourceEvent.stopPropagation();
            })
            .on("drag", function (Node) {
                Node.nudge(d3.event.dx, d3.event.dy);
                self.render();
            }).on("end", function (Node) {

            });
        return drag;
    }

    function init () {
        //init trigger only once a graph
        if(this._hasInit) return;


        //add predefined DOM
        appendPreElement.call(this);
        appendPreDefs.call(this);

        this._getSvgSelection()
            .classed("graph", true);

        //bind listener to page for keyboard shortCuts and mouse events
        d3.select(document.body)
            .on("keydown.brush", this._keydowned.bind(this))
            .on("keyup.brush", this._keyupped.bind(this));

        //add zoom instance to graph
        this.zoom = Zoom.call(this);
        this._getSvgSelection()
            .call(this.zoom);

        //add brush instance to graph
        this.brush = Brush.call(this);
        this._getBrushSelection()
            .call(this.brush);

        
        //new drag instance for bind to nodes
        this.dragNode = DragNode.call(this);

        this._hasInit = true;
    }

    function getAbsUrl () {
        return window.location.href.split('#')[0];
    }

    function drawNodes () {
        var nodes = this._getNodesSelection().data(this.getRenderedNodes(), function (d) { return d.id;});

        var g = nodes.enter().append('g')
            .each(function(Node){ Node._element = this })//reference element to Node
            .classed('node', true)
            .call(this.dragNode);

        //添加矩形
        g.append("rect")
            .attr("filter", "url(" + getAbsUrl() + "#shadow)")
            .classed("circle", true);
        g.append('svg:foreignObject')
            .attr('class', 'text-group')
            .append("xhtml:div")
            .append('xhtml:span');

        //Enter and Update
        var all = nodes.enter().merge(nodes);

        all.selectAll(".node").attr("transform", function (Node) { return Node.getTranslate(); });

        all.selectAll('rect')
            .attr("width", function(Node){ return Node.size()})
            .attr("height", function(Node){ return Node.size()})
            .style("fill", function(Node){ return Node.color() });


        all.selectAll('.text-group')
            .attr('width', function (Node) { return Node.getLabelWidth(); })
            .attr("height", function(Node){ return Node.size()})
            .style("line-height", function(Node){ return Node.size() + "px" })
            .attr('transform', function(Node){return "translate(" + (1 + Node.size()) + ", 0)" })

            .selectAll('div')
            .attr('title', function (Node) { return Node.label(); })
            .selectAll('span')
            .text(function (Node) { return Node.label(); });

        nodes.exit().remove();
    }

    function drawLinks () {
        var self = this;
        var links = this._getLinksSelection().data(this.getRenderedLinks(), function (Link) { return Link.getId() });

        links.enter()
            .append('path')
            .classed('link-path', true)
            .attr('id', function(Link){ return "link-path" + Link.getId()});

        var all  = links.enter().merge(links);

        all.selectAll('path')
            .attr('d', function (Link) { var c = Link.getCoordination();  return 'M ' + c.Sx + ' ' + c.Sy + ' L ' + c.Tx + ' ' + c.Ty; })
            .style('marker-start', function (Link) { return Link.getStartArrow(); })
            .style('marker-end', function (Link) { return Link.getEndArrow(); });


        links.exit().remove();



        //绑定linkData数据到linkLabels
        var linkLabels = this._getLinksLabelSelection().data(this._links, function (Link) { return Link.getId(); });

        //按需增加新的LinkLabels(当linksData data > linkPaths element)
        linkLabels.enter().append('text')
            .style("pointer-events", "none")
            .classed('link-label', true)
            .attr('id', function (Link) { return 'link-label' + Link.getId(); })
            .append('textPath')
            .attr('xlink:href', function (Link) {  return getAbsUrl() + '#link-path' + Link.getId(); })
            .style("pointer-events", "none");


        var allLabels = linkLabels.enter().merge(linkLabels);

        allLabels.selectAll('text.link-label')
            .attr('dx', function(Link){ return Link.getTextCenter() })
            .attr('dy', 1)
            .attr('font-size', 13);

        allLabels.selectAll('textPath')
            .text(function (Link) {
                return Link.label();
            })
            //反转字体，使字体总是朝上，该句放于该函数最后执行，提前会导致问题
            .attr('transform', function(Link){ return Link.getLinkLabelTransform(self._getCurrentScale()); });


        linkLabels.exit().remove();
    }

    function draw () {
        drawNodes.call(this);
        drawLinks.call(this);
    }

    function zoomed () {
        var self = this;
        //不可移动
        if (!this.movable) {
            //将变换前的translate值赋给变换后的translate值,保持位置不变
            //this.zoom.translate(scope.config.status.translate);
        }
        //不可缩放
        if (!this.zoomable) {
            //this.zoom.scale(scope.config.status.scale);
        }
        //Graph._ifShowLabels();


        //不缩放text文字内容
        this._getNodesLabelSelection()
            .attr("height", function(Node){ return Node.size() * self._getCurrentScale(); })
            .style("line-height", function(Node){ return Node.size() * self._getCurrentScale() + "px"; })
            .attr("transform", function(Node){ return "translate(" + (1 + Node.size()) + ", 0) scale(" + 1 / d3.event.transform.k + ")"; });

        //linkLabels文字不缩放
        this._getLinksLabelSelection().attr("transform", function(Link){ return Link.getLinkLabelTransform(d3.event.transform.k); });
        //缩放网络图
        this._getForceGroup().attr("transform", "translate(" + d3.event.transform.x + ", "+ d3.event.transform.y + ") scale(" + d3.event.transform.k + ")");

        // if (Graph.brush) {
        //     //brush框选组件随之缩放
        //     Graph.brush.attr("zoomed", "translate(" + this._getCurrentTranslate() + ") scale(" + this._getCurrentScale() + ")");
        // }
        //将状态记录在config中
        // scope.config.status.translate = Graph.zoom.translate();
        // scope.config.status.scale = Graph.zoom.scale();
    }

    function transform (k, x, y, duration) {
        var transformed = d3.zoomIdentity;
        if(typeof k === "number") transformed = transformed.scale(k);
        if(typeof x === "number" && typeof y === "number") transformed = transformed.translate(x, y);
        this._getSvgSelection(duration).call(this.zoom.transform, transformed);
    }

    function scaleTo (k, duration) {
        this.transform(k, null, null, duration);
    }

    function translateBy (x, y, duration) {
        this.transform(null, x, y , duration);
    }

    function keydowned () {
        if (!d3.event.metaKey) {
            switch (d3.event.keyCode) {
                //shift alt and space is used by d3 brush
                case 90:
                    this.brush.show();
                    break;
            }
        }
    }

    function keyupped () {
        if (!d3.event.metaKey) {
            switch (d3.event.keyCode) {
                case 90:
                    this.brush.hide();
                    break;
            }
        }
    }

    //nodes could be: Node, [Node], Node id string, Node id array of string
    function n2l (nodes) {
        this.getNodes(nodes).forEach(function (Node) {
            Node.transformToLink();

            this.getLinksByNodes(Node).forEach(function(Link){
               //Link.transformToLink();
            });
        }, this);

        this.render();
    }

    function Graph(selector, config) {
        if(config === undefined) config = {};

        this._svg = select(selector);

        this._hasInit = false; //init only once

        this._nodeSize = config.nodeSize || 30;
        this._movable = config.movable || false;
        this._zoomable = config.zoomable || false;
        
        this._nodes = [];
        this._links = [];
    }

    Graph.prototype = {
        constructor: Graph,
        width: width,
        height: height,
        render: render,
        data: data,
        nodes: nodes,
        getNodes: getNodes,
        getRenderedNodes: getRenderedNodes,
        addNode: addNode,
        removeNodes: removeNodes,
        clearNodes: clearNodes,
        hasNode: hasNode,
        n2l: n2l,
        links: links,
        getLinks: getLinks,
        getRenderedLinks: getRenderedLinks,
        getLinksByNodes: getLinksByNodes,
        addLink: addLink,
        hasLink: hasLink,
        removeLinks: removeLinks,
        _removeLinksByNodes: removeLinksByNodes,
        clearLinks: clearLinks,
        transform: transform,
        scaleTo: scaleTo,
        translateBy: translateBy,
        _keydowned: keydowned,
        _keyupped: keyupped,
        _init: init,
        _draw: draw,
        _zoomed: zoomed,
        _getCurrentTransform: function(){
            return d3.zoomTransform(this._svg);
        },
        _getCurrentScale: function(){
            return this._getCurrentTransform().k;
        },
        _getCurrentTranslate: function(){
            var transform = this._getCurrentTransform();
            return [transform.x, transform.y];
        },
        _getBrushSelection: function () {
            return this._getSvgSelection().select('g.brush');
        },
        _getSvgSelection: function(duration){
            var svgSelection = d3.select(this._svg);

            if(duration) svgSelection = svgSelection.transition(Math.random()).duration(duration);

            return svgSelection
        },
        _getNodesSelection: function(){
            return this._getSvgSelection().select('.nodes').selectAll("g.node");
        },
        _getNodesLabelSelection: function(){
            return this._getNodesSelection().selectAll('.text-group');
        },
        _getLinksSelection: function(){
            return this._getSvgSelection().select('g.paths').selectAll("path");
        },
        _getLinksLabelSelection: function(){
            return this._getSvgSelection().select('g.link-labels').selectAll('text');
        },
        _getForceGroup: function(){
            return this._forceGroupSelection;
        }
    };

    function index (selector) {
        return new Graph(selector);
    }

    var utils = {
        filterBy: filterBy,
        getIds: getIds,
        toArray: toArray,
        getStrLen: getStrLen,
        getOffsetCoordinate: getOffsetCoordinate
    };

    exports.graph = index;
    exports.utils = utils;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=g3.js.map
