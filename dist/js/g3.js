//g3
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.g3 = global.g3 || {})));
}(this, function (exports) { 'use strict';

    function select (selector) {
        return typeof selector === "string" ? document.querySelector(selector) : selector;
    }

    function width (width) {
        if (!arguments.length) {
            return this._width;
        }

        this._width = width;

        return this;
    }

    function height (height) {
        if (!arguments.length) {
            return this._height;
        }
        this._height = height;

        return this;
    }

    function render () {
        this._init();
        this._draw();
    }

    function data (data) {
        if (!arguments.length) {
            return data;
        }
        this._data = data;
        return this;
    }

    function nodes (nodes, cover) {
        if (!Array.isArray(nodes)) {
            nodes = [nodes];
        }

        if (!arguments.length) {
            return this._nodes;
        }

        if (cover) {
            this.clearNodes();
        }

        nodes.forEach(function (v) {
            this.addNode(v);
        }, this);

        return this;
    }

    function Node(data) {
        this.id = data.id;
        this.x = data.x;
        this.y = data.y;
    }

    Node.prototype = {
        constructor: Node,
        getId: function getId() {
            return this.id;
        },
        getColor: function getColor() {
            return this.color || "#123456";
        },
        getTranslate: function getTranslate() {
            return "translate(" + this.x + "," + this.y + ")";
        }
    };

    function addNode (obj) {
        var node = new Node(obj);
        if (!this.hasNode(node)) this._nodes.push(node);
    }

    function hasNode (node) {
        var ids = this._nodes.map(function (d) {
            return d.id;
        });

        return ids.indexOf(node.id) !== -1;
    }

    function clearNodes () {
        this._nodes = [];
    }

    function links (links, cover) {
        if (!Array.isArray(links)) {
            links = [links];
        }

        if (!arguments.length) {
            return this._links;
        }

        if (cover) {
            this.clearLinks();
        }

        links.forEach(function (v) {
            this.addLink(v);
        }, this);
        console.log(this._links);
        return this;
    }

    function getNodeById (id, Nodes) {
        return Nodes.filter(function (d) {
            return d.id === id;
        })[0];
    }

    //Link has source and target Node in _nodes
    function hasST () {
        return this.source !== undefined && this.target !== undefined;
    }

    function getOffsetEndCoordinate (Xs, Ys, Xd, Yd, offsetLength) {
        var offsetScale = d3.scaleLinear().domain([1, 20]).range([25, 50]).clamp(true);
        var s = offsetScale(offsetLength) || 30;

        var l = Math.sqrt((Xd - Xs) * (Xd - Xs) + (Yd - Ys) * (Yd - Ys));
        var sin = (Yd - Ys) / l;
        var cos = (Xd - Xs) / l;
        return {
            x: Xd - s * cos,
            y: Yd - s * sin
        };
    }

    function getPath (r) {
        var offset = getOffsetEndCoordinate(this.source.x, this.source.y, this.target.x, this.target.y, this.originalLinks ? this.originalLinks.length : 1);
        var halfR = r / 2;

        return 'M ' + (this.source.x + halfR) + ' ' + (this.source.y + halfR) + ' L ' + (offset.x + halfR) + ' ' + (offset.y + halfR);
    }

    function getStartArrow () {
        return "url(" + window.location.href.split('#')[0] + "#start-arrow)";
    }

    function getEndArrow () {
        return "url(" + window.location.href.split('#')[0] + "#end-arrow)";
    }

    function Link(data, nodes) {
        this.id = data.id;
        this.label = data.label;
        this.src = data.src;
        this.dst = data.dst;

        this.source = getNodeById(this.src, nodes);
        this.target = getNodeById(this.dst, nodes);
    }

    Link.prototype = {
        constructor: Link,
        hasST: hasST,
        getPath: getPath,
        getStartArrow: getStartArrow,
        getEndArrow: getEndArrow

    };

    function addLink (obj) {
        var link = new Link(obj, this._nodes);
        if (!this.hasLink(link) && link.hasST()) this._links.push(link);
    }

    function hasLink (link) {
        var ids = this._links.map(function (d) {
            return d.id;
        });

        return ids.indexOf(link.id) !== -1;
    }

    function clearLinks () {
        this._links = [];
    }

    function appendPreDefs () {
        var str = "<defs>\n                        <filter id=\"shadow\" x=\"-20%\" y=\"-20%\" width=\"200%\" height=\"200%\" type=\"Shadow\" shadowoffsetx=\"5\" shadowoffsety=\"5\" shadowblur=\"5\" shadowcolor=\"rgba(0,0,0)\">\n                            <feOffset result=\"offOut\" in=\"SourceGraphic\" dx=\"0\" dy=\"3\"></feOffset>\n                            <feColorMatrix result=\"matrixOut\" in=\"offOut\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0\"></feColorMatrix>\n                            <feGaussianBlur result=\"blurOut\" in=\"matrixOut\" stdDeviation=\"2\"></feGaussianBlur>\n                            <feBlend in=\"SourceGraphic\" in2=\"blurOut\" mode=\"normal\"></feBlend>\n                        </filter>\n                        <marker id=\"start-arrow\" viewBox=\"0 -5 10 10\" refX=\"-6\" markerWidth=\"3\" markerHeight=\"3\" orient=\"auto\"><path d=\"M10,-5L0,0L10,5\"></path></marker>\n                        <marker id=\"end-arrow\" viewBox=\"0 -5 10 10\" refX=\"0\" markerWidth=\"3\" markerHeight=\"3\" orient=\"auto\"><path d=\"M0,-5L10,0L0,5\"></path></marker>\n                        <marker id=\"end-arrow-hover\" viewBox=\"0 -5 10 10\" refX=\"0\" markerWidth=\"3\" markerHeight=\"3\" orient=\"auto\"><path d=\"M0,-5L10,0L0,5\"></path></marker>\n                        <marker id=\"end-arrow-selected\" viewBox=\"0 -5 10 10\" refX=\"0\" markerWidth=\"3\" markerHeight=\"3\" orient=\"auto\"><path d=\"M0,-5L10,0L0,5\"></path></marker>\n                        <radialGradient id=\"linear\" cx=\"50%\" cy=\"50%\" r=\"50%\" fx=\"50%\" fy=\"50%\">\n                            <stop offset=\"0%\" style=\"stop-color:rgb(255，255,255);stop-opacity:0\" />\n                            <stop offset=\"90%\" style=\"stop-color:rgb(255,255,255);stop-opacity:1\" />\n                            <stop offset=\"98%\" style=\"stop-color:rgb(255,255,255);stop-opacity:1\" />\n                            <stop offset=\"100%\" style=\"stop-color:rgb(222，222, 222);stop-opacity:1\" />\n                        </radialGradient>\n                </defs>";

        this._svg.insertAdjacentHTML("afterbegin", str);
    }

    function appendPreElement () {
        var svg = d3.select(this._svg);
        svg.append("g").attr("class", "brush");

        var forceGroup = svg.append('g').attr('class', 'force');
        forceGroup.append("g").attr("class", "links");
        forceGroup.append("g").attr("class", "paths");
        forceGroup.append("g").attr("class", "link-labels");
        forceGroup.append("g").attr("class", "nodes");
    }

    var init = false;
    function init$1 () {
        if (!init) {
            d3.select(this._svg).classed("graph", true);
            appendPreElement.call(this);
            appendPreDefs.call(this);
            init = true;
        }
    }

    function drawNodes () {

        var nodes = d3.select('svg .nodes').selectAll("g.node").data(this._nodes, function (d) {
            return d.id;
        });

        var g = nodes.enter().append('g').attr("transform", function (node) {
            return node.getTranslate();
        }).classed('node', true);

        //添加矩形
        g.append("rect").attr("width", this._r).attr("height", this._r).attr("filter", "url(" + window.location.href.split('#')[0] + "#shadow)").style("fill", function (Node) {
            return Node.getColor();
        });
    }

    function drawLinks () {
        var self = this;
        var linkPaths = d3.select('.paths').selectAll('path').data(this._links, function (d) {
            return d.id;
        });

        linkPaths.enter().append('path').classed('link-path', true).attr('d', function (Link) {
            return Link.getPath(self._r);
        }).style('marker-start', function (Link) {
            return Link.getStartArrow();
        }).style('marker-end', function (Link) {
            return Link.getEndArrow();
        });
    }

    function draw () {
        drawNodes.call(this);
        drawLinks.call(this);
    }

    function Graph(selector) {
        this._svg = select(selector);
        this._r = 30;
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
        clearNodes: clearNodes,
        hasNode: hasNode,
        links: links,
        addLink: addLink,
        hasLink: hasLink,
        clearLinks: clearLinks,
        _init: init$1,
        _draw: draw
    };

    function index (selector) {
        return new Graph(selector);
    }

    exports.graph = index;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=g3.js.map
