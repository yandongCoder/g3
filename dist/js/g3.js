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
            //console.log('render');

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

        this.graph.render();

        return this;
    }

    function transformToLink () {
        this._transformed = true;
    }

    function nudge (nudgeX, nudgeY) {
        this.x += nudgeX;
        this.y += nudgeY;
        this.graph.render();
        return this;
    }

    function color (color) {
        if(!arguments.length) return this._color || "#123456";

        this._color = color;
        this.graph.render();

        return this;
    }

    function radius (radius) {
        if(!arguments.length) return this._radius;

        this._radius = radius;
        this.graph.render();

        return this;
    }

    function label (label) {
        if(!arguments.length) return this._label || "";

        this._label = label;
        this.graph.render();

        return this;
    }

    function getX() {
        return this.x;
    }

    function getY() {
        return this.y;
    }

    //data: data obj, graph: graphInstance
    function Node(data, graph) {
        this.graph = graph;
        this.id = data.id;
        this._label = data.label;
        this.x = data.x;
        this.y = data.y;
        this._radius = data.radius || graph._radius;
        this._color = data.color;
        this._selected = data.selected || false; //indicate whether node is select
    }

    Node.prototype = {
        constructor: Node,
        selected: selected,
        transformToLink: transformToLink,
        nudge: nudge,
        getId: function () {
            return this.id;
        },
        getX: getX,
        getY: getY,
        label: label,
        getLabelWidth: function(){
            return getStrLen(this.label()) * 9;
        },
        color: color,
        radius: radius

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

    function filterById (id, Nodes) {
        return Nodes.filter(function(d){
            return d.id === id;
        })[0];
    }

    //Link has source and target Node in _nodes
    function hasST () {
        return (this.source !== undefined) && (this.target !== undefined);
    }

    function getOffsetCoordinate (Sx, Sy, Tx, Ty, offsetS, offsetT) {
        var l = Math.sqrt((Tx - Sx) * (Tx - Sx) + (Ty - Sy) * (Ty - Sy));
        var sin = (Ty - Sy) / l;
        var cos = (Tx - Sx) / l;
        
        return {
            Sx: Sx + offsetS * cos,
            Sy: Sy + offsetS * sin,
            Tx: Tx - offsetT * cos,
            Ty: Ty - offsetT * sin
        }
    }

    //Link coordination is Node center's coordination or coordination where arrow placed, if any.
    function getCoordination (forText) {

        var sourceOffset = this.source.radius();
        var targetOffset = this.target.radius();
        var arrowLength = this.width() * 3;

        var Sx = this.source.getX(),
            Sy = this.source.getY(),
            Tx = this.target.getX(),
            Ty = this.target.getY();


        if(this.hasSourceArrow()) sourceOffset += arrowLength;
        if(this.hasTargetArrow()) targetOffset += arrowLength;

        var offset = getOffsetCoordinate(Sx, Sy, Tx, Ty, sourceOffset, targetOffset);

        if(this.hasSourceArrow()){
            Sx = offset.Sx;
            Sy = offset.Sy;
        }
        if(this.hasTargetArrow()){
            Tx = offset.Tx;
            Ty = offset.Ty;
        }

        if(forText){
            Sx = offset.Sx;
            Sy = offset.Sy;
            Tx = offset.Tx;
            Ty = offset.Ty;
        }

        return {
            Sx: Sx,
            Sy: Sy,
            Tx: Tx,
            Ty: Ty
        };
    }

    const DIRECTION = {
        NONE: 0,
        FROM: 1,
        TO: 2,
        DOUBLE: 3
    };

    function getStartArrow () {
        if(this.direction === DIRECTION.TO || this.direction === DIRECTION.DOUBLE)
            return "url(" + window.location.href.split('#')[0] + "#start-arrow)";
        else
            return "";
    }

    function getEndArrow () {
        if(this.direction === DIRECTION.FROM || this.direction === DIRECTION.DOUBLE)
            return "url(" + window.location.href.split('#')[0] + "#end-arrow)";
        else
            return "";
    }

    function getTextOffset () {
        var self = this;
        var coord = this.getCoordination(true);

        var x = Math.abs(coord.Tx - coord.Sx);
        var y = Math.abs(coord.Ty - coord.Sy);
        var z = Math.sqrt(x * x + y * y);

        var charLength = getStrLen(this.label()) * 6.6 / 2;

        var dx = z / 2 - charLength;
        
        return dx + textLeftOffset();

        function textLeftOffset(){
            if((self.hasTargetArrow() && !self.hasSourceArrow()) || (!self.hasTargetArrow() && !self.hasSourceArrow())) return self.source.radius();
            //else if(!self.hasTargetArrow() && self.hasSourceArrow()) return self.target.radius();
            else return 0;
        }
    }

    function getLinkLabelTransform (scaleFactor) {
        var coord = this.getCoordination(true);
        var rx = (coord.Sx + coord.Tx) / 2;
        var ry = (coord.Sy + coord.Ty) / 2;


        if (coord.Tx < coord.Sx) {
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
        if(!arguments.length) return this._label || "";

        this._label = label;
        this.graph.render();

        return this;
    }

    function width$1 (width) {
        if(!arguments.length) return this._width;

        this._width = width;
        this.graph.render();

        return this;
    }

    function Link(data, nodes, graph) {
        this.graph = graph;
        this.id = data.id;
        this._label = data.label;
        this._width = data.width || graph._linkWidth;
        this.src = data.src;
        this.dst = data.dst;
        this.direction = data.direction === undefined? 1: data.direction;//0: none, 1: from, 2: to, 3 double

        this.source = filterById(this.src, nodes);
        this.target = filterById(this.dst, nodes);
    }

    Link.prototype = {
        constructor: Link,
        hasST: hasST,
        transformToLink: transformToLink$1,
        getCoordination: getCoordination,
        getStartArrow: getStartArrow,
        getEndArrow: getEndArrow,
        getTextOffset: getTextOffset,
        getLinkLabelTransform: getLinkLabelTransform,
        label: label$1,
        width: width$1,
        hasSourceArrow: function(){
            return this.direction === DIRECTION.TO || this.direction === DIRECTION.DOUBLE;
        },
        hasTargetArrow: function(){
            return this.direction === DIRECTION.FROM || this.direction === DIRECTION.DOUBLE;
        },
        getId: function () {
            return this.id;
        }
    };

    function addLink (obj) {
        var link = new Link(obj, this._nodes, this);
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
            .extent([[0, 0], [1500, 500]])
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

    function getAbsUrl (url) {
        return (url || window.location.href).split('#')[0];
    }

    function drawNodes () {
        var self = this;
        var nodes = this._getNodesSelection().data(this.getRenderedNodes(), function (d) { return d.id;});

        var g = nodes.enter().append('g')
            .each(function(Node){ Node._element = this })//reference element to Node
            .classed('node', true)
            .classed("selected", function(Node){return Node.selected()})
            .call(this.dragNode);

        //添加矩形
        g.append("circle")
            .attr("filter", "url(" + getAbsUrl() + "#shadow)");
        g.append('svg:foreignObject')
            .attr('class', 'text-group')
            .append("xhtml:div")
            .append('xhtml:span');

        //Enter and Update
        var all = this._getNodesSelection();

        all.attr("transform", function (Node) { return "translate(" + Node.getX() + "," + Node.getY() + ")";});

        all.select('circle')
            .attr("r", function(Node){ return Node.radius()})
            .style("fill", function(Node){ return Node.color() });
        

        all.select('.text-group')
            .attr('width', function (Node) { return Node.getLabelWidth(); })
            .attr("height", function(Node){ return Node.radius() * self._getCurrentScale(); })
            .style("line-height", function(Node){ return Node.radius() * self._getCurrentScale() + "px"; })
            .attr("transform", function(Node){ return "translate(" + (1 + Node.radius()) + ", 0) scale(" + 1 / self._getCurrentScale()+ ")"; })

            .select('div')
            .attr('title', function (Node) { return Node.label(); })
            .select('span')
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

        var all  = this._getLinksSelection();

        all
            .attr('d', function (Link) { var c = Link.getCoordination();  return 'M ' + c.Sx + ' ' + c.Sy + ' L ' + c.Tx + ' ' + c.Ty; })
            .style('marker-start', function (Link) { return Link.getStartArrow(); })
            .style('marker-end', function (Link) { return Link.getEndArrow(); })
            .style('stroke-width', function(Link){ return Link.width()});


        links.exit().remove();



        //绑定linkData数据到linkLabels
        var linkLabels = this._getLinksLabelSelection().data(this._links, function (Link) { return Link.getId(); });

        //按需增加新的LinkLabels(当linksData data > linkPaths element)
        linkLabels.enter().append('text')
            .style("pointer-events", "none")
            .classed('link-label', true)
            .attr('id', function (Link) { return 'link-label' + Link.getId(); })
            //.attr('text-anchor', 'middle')
            .append('textPath')
            .attr('xlink:href', function (Link) {  return getAbsUrl() + '#link-path' + Link.getId(); })
            //.attr('startOffset', '50%')
            .style("pointer-events", "none");


        var allLabels = this._getLinksLabelSelection();

        allLabels
            .attr('dx', function(Link){return Link.getTextOffset(); })
            .attr('dy', 1)
            .attr('font-size', 13)
            //反转字体，使字体总是朝上，该句放于该函数最后执行，提前会导致问题
            .attr('transform', function(Link){ return Link.getLinkLabelTransform(self._getCurrentScale()); });

        allLabels.select('textPath')
            .text(function (Link) {
                return Link.label();
            });


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


        //缩放网络图
        this._getForceGroup().attr("transform", "translate(" + d3.event.transform.x + ", "+ d3.event.transform.y + ") scale(" + self._getCurrentScale() + ")");

        self.render();

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

        this._radius= config.radius || 15;
        this._linkWidth = config.linkWidth || 3;
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
            return this._getSvgSelection().select('g.link-labels').selectAll('text.link-label');
        },
        _getForceGroup: function(){
            return this._forceGroupSelection;
        }
    };

    function index (selector) {
        return new Graph(selector);
    }

    function parseHTML (str) {
        var tmp = document.implementation.createHTMLDocument();
        tmp.body.innerHTML = str;
        return tmp.body.children[0];
    }

    var utils = {
        filterBy: filterBy,
        filterById: filterById,
        getIds: getIds,
        getAbsUrl: getAbsUrl,
        toArray: toArray,
        getStrLen: getStrLen,
        getOffsetCoordinate: getOffsetCoordinate,
        parseHTML: parseHTML
    };

    exports.graph = index;
    exports.utils = utils;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=g3.js.map
