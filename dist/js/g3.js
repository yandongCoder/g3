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

    function nodes (nodes, cover) {
        if(!Array.isArray(nodes)){
            nodes = [nodes];
        }

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

    //中文为2长度，非中文为1

    function getStrLen (str) {
        var len = 0;
        if (typeof str !== "string") {
            return len;
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

    function Node(data) {
        this.id = data.id;
        this.label = data.label;
        this.x = data.x;
        this.y = data.y;
        this._selected = false; //indicate whether node is select
    }

    Node.prototype = {
        constructor: Node,
        selected: selected,
        getId: function () {
            return this.id;
        },
        getX: function(){
            return this.x;
        },
        getY: function () {
            return this.y;
        },
        getLabelWidth: function(){
            return getStrLen(this.getLabel()) * 9;
        },
        getLabel: function(){
            return this.combinedLabel || this.label || "No Label";
        },
        getColor: function () {
            return this.color || "#123456";
        },
        getTranslate: function () {
            return "translate(" + this.x + "," + this.y + ")";
        }
    };

    function addNode (obj) {
        var node = new Node(obj);
        if(!this.hasNode(node)) this._nodes.push(node);
    }

    function hasNode (node) {
        var ids = this._nodes.map(function(d){return d.id});

        return ids.indexOf(node.id) !== -1;
    }

    function toArray (maybeArr) {
        if(!Array.isArray(maybeArr)) maybeArr = [maybeArr];
        return maybeArr;
    }

    //nodes could be: Node, [Node], Node id string, Node id array of string
    function removeNodes (nodes) {
        nodes = toArray(nodes);

        var removedIds = nodes.map(function(node){
            if(typeof node  ===  'object') return node.id;
            else return node;
        });

        this._nodes.forEach(function(Node){
            var index = removedIds.indexOf(Node.getId());
            if(index !== -1) {
                this._nodes.splice(index, 1);
            }
        }, this);

        this._removeLinksByNodes(removedIds);

        this.render();
    }

    function clearNodes () {
        this._nodes = [];
    }

    function links (links, cover) {
        if(!Array.isArray(links)){
            links = [links];
        }

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

    function getNodeById (id, Nodes) {
        return Nodes.filter(function(d){
            return d.id === id;
        })[0];
    }

    //Link has source and target Node in _nodes
    function hasST () {
        return (this.source !== undefined) && (this.target !== undefined);
    }

    function getOffsetCoordinate (Xs, Ys, Xd, Yd, offsetLength) {
        var offsetScale = d3.scaleLinear().domain([1, 20]).range([25, 50]).clamp(true);
        var s = offsetScale(offsetLength) || 30;

        var l = Math.sqrt((Xd - Xs) * (Xd - Xs) + (Yd - Ys) * (Yd - Ys));
        var sin = (Yd - Ys) / l;
        var cos = (Xd - Xs) / l;

        return {
            Xs: Xs + s * cos || Xs,
            Ys: Ys + s * sin || Ys,
            Xd: Xd - s * cos || Xd,
            Yd: Yd - s * sin || Yd
        }
    }

    const DIRECTION = {
        NONE: 0,
        FROM: 1,
        TO: 2,
        DOUBLE: 3
    };

    function getPath (r, asSvgPathAttr) {
        var offset = getOffsetCoordinate(this.source.x, this.source.y, this.target.x, this.target.y, this.originalLinks ? this.originalLinks.length : 1);
        var halfR = r / 2;

        var Xs = this.source.x,
            Ys = this.source.y,
            Xd = this.target.x,
            Yd = this.target.y;

        if(this.direction === DIRECTION.TO || this.direction === DIRECTION.DOUBLE){
            Xs = offset.Xs;
            Ys = offset.Ys;
        }
        if(this.direction === DIRECTION.FROM || this.direction === DIRECTION.DOUBLE){
            Xd = offset.Xd;
            Yd = offset.Yd;
        }

        if(asSvgPathAttr)
            return 'M ' + (Xs + halfR) + ' ' + (Ys + halfR) + ' L ' + (Xd + halfR) + ' ' + (Yd + halfR);
        else
            return {
                Xs: Xs + halfR,
                Ys: Ys + halfR,
                Xd: Xd + halfR,
                Yd: Yd + halfR
            };
    }

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

    function getTextCenter (pathCoord) {

        var x = Math.abs(pathCoord.Xs - pathCoord.Xd);
        var y = Math.abs(pathCoord.Ys - pathCoord.Yd);
        var z = Math.sqrt(x * x + y * y);
        var charLength = getStrLen(this.getLabel()) * 6 / 2;
        //字长度
        return z / 2 - charLength;
    }

    function getLinkLabelTransform (r, scaleFactor) {
        var coord = this.getPath(r);
        var rx = (coord.Xs + coord.Xd) / 2;
        var ry = (coord.Ys + coord.Yd) / 2;

        if (coord.Xd < coord.Xs) {
            return 'rotate(180 ' + rx + ' ' + ry + ') translate(' + rx + ' ' + ry + ') scale(' + 1 / scaleFactor + ') translate(' + -rx + ' ' + -ry + ')';
            //先移动原点到字体位置，然后进行缩放，在将原点移回到初始位置
        } else {
            return 'translate(' + rx + ' ' + ry + ') scale(' + 1 / scaleFactor + ') translate(' + -rx + ' ' + -ry + ')';
        }
    }

    function Link(data, nodes) {
        this.id = data.id;
        this.label = data.label;
        this.src = data.src;
        this.dst = data.dst;
        this.direction = data.direction === undefined? 1: data.direction;//0: none, 1: from, 2: to, 3 double

        this.source = getNodeById(this.src, nodes);
        this.target = getNodeById(this.dst, nodes);
    }

    Link.prototype = {
        constructor: Link,
        hasST: hasST,
        getPath: getPath,
        getStartArrow: getStartArrow,
        getEndArrow: getEndArrow,
        getTextCenter: getTextCenter,
        getLinkLabelTransform: getLinkLabelTransform,
        getId: function () {
            return this.id;
        },
        getLabel: function(){
            return this.combinedLabel || this.label || this.linkTypeName || 'No label';
        }
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
        links = toArray(links);

        var removedIds = links.map(function(link){
            if(typeof link  ===  'object') return link.id;
            else return link;
        });

        this._links.forEach(function(Link){
            var index = removedIds.indexOf(Link.getId());
            if(index !== -1) this._links.splice(index, 1);
        }, this);

        this.render();
    }

    //nodes could be: Node, [Node], Node id string, Node id array of string
    function removeLinksByNodes (nodes) {
        nodes = toArray(nodes);

        var removedIds = nodes.map(function(node){
            if(typeof node  ===  'object') return node.id;
            else return node;
        });

        var toRemovedLinks = this._links.filter(function (Link) {
            return  (removedIds.indexOf(Link.source.id) !== -1) || (removedIds.indexOf(Link.target.id) !== -1);
        });

        toRemovedLinks.map(function (Link) {
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

        this._hasInit = true;
    }

    function getAbsUrl () {
        return window.location.href.split('#')[0];
    }

    function drawNodes () {
        var nodes = this._getNodesSelection().data(this._nodes, function (d) {
            return d.id;
        });

        var g = nodes.enter().append('g')
            .each(function(Node){ Node._element = this })//reference element to Node
            .attr("transform", function (node) {
                return node.getTranslate();
            })
            .classed('node', true);
        
        //添加矩形
        g.append("rect")
            .attr("width", this._r)
            .attr("height", this._r)
            .attr("filter", "url(" + getAbsUrl() + "#shadow)")
            .style("fill", function(Node){ return Node.getColor() });


        var textGroup = g.append('svg:foreignObject')
            .attr('class', 'text-group')
            .attr('width', function (Node) {
                return Node.getLabelWidth();
            })
            .attr("height", this._r)
            .style("line-height", this._r + 'px')
            .attr('transform', "translate(" + (1 + this._r) + ", 0)");

        textGroup.append("xhtml:div")
            .attr('title', function (Node) {
                return Node.getLabel();
            })
            .append('xhtml:span')
            .text(function (Node) {
                return Node.getLabel();
            });

        nodes.exit().remove();
    }

    function drawLinks () {
        var self = this;
        var linkPaths = this._getLinksSelection().data(this._links, function (Link) { return Link.getId() });

        linkPaths.enter()
            .append('path')
            .classed('link-path', true)
            .attr('id', function(Link){ return "link-path" + Link.getId()})
            .attr('d', function (Link) {
                return Link.getPath(self._r, true);
            })
            .style('marker-start', function (Link) {
                return Link.getStartArrow();
            })
            .style('marker-end', function (Link) {
                return Link.getEndArrow();
            });

        //绑定linkData数据到linkLabels
        var linkLabels = this._getLinksLabelSelection().data(this._links, function (Link) { return Link.getId(); });

        //按需增加新的LinkLabels(当linksData data > linkPaths element)
        var linkTexts = linkLabels.enter().append('text')
            //.filter(function(d){
            //    return !d.hide;
            //})
            .style("pointer-events", "none")
            .classed('link-label', true)
            .attr('id', function (Link) {
                return 'link-label' + Link.getId()
            })
            .attr('dx', function(Link){ return Link.getTextCenter(Link.getPath(self._r)) })
            .attr('dy', 1)
            .attr('font-size', 13);


        //根据当前数据重新生成textPath
        linkTexts.append('textPath')
            //.filter(function(d){
            //    return !d.hide;
            //})
            .attr('xlink:href', function (Link) {
                return getAbsUrl() + '#link-path' + Link.getId();
            })
            .style("pointer-events", "none").text(function (Link) {
                return Link.getLabel();
            });



        //反转字体，使字体总是朝上，该句放于该函数最后执行，提前会导致问题
        linkTexts.attr('transform', function(Link){ return Link.getLinkLabelTransform(self._r, self._getCurrentScale()); });

        linkPaths.exit().remove();
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
            .attr("height", this._r * this._getCurrentScale())
            .style("line-height", this._r * this._getCurrentScale() + "px")
            .attr("transform", "translate(" + (1 + this._r) + ", 0) scale(" + 1 / d3.event.transform.k + ")");

        //linkLabels文字不缩放
        this._getLinksLabelSelection().attr("transform", function(Link){ return Link.getLinkLabelTransform(self._r, d3.event.transform.k); });
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

    function Graph(selector, config) {
        if(config === undefined) config = {};

        this._svg = select(selector);

        this._hasInit = false; //init only once

        this._r = config.r || 30;
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
        addNode: addNode,
        removeNodes: removeNodes,
        clearNodes: clearNodes,
        hasNode: hasNode,
        links: links,
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
            return this._getSvgSelection().select('.paths').selectAll("path");
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

    exports.graph = index;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=g3.js.map
