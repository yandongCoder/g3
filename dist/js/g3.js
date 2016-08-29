//g3
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.g3 = global.g3 || {})));
}(this, function (exports) { 'use strict';

    function select (selector) {
        return typeof selector === "string" ? document.querySelector(selector) : selector;
    }

    function appendPreDefs (parent) {
        var str = "<defs>\n                        <filter id=\"shadow\" x=\"-20%\" y=\"-20%\" width=\"200%\" height=\"200%\" type=\"Shadow\" shadowoffsetx=\"5\" shadowoffsety=\"5\" shadowblur=\"5\" shadowcolor=\"rgba(0,0,0)\">\n                            <feOffset result=\"offOut\" in=\"SourceGraphic\" dx=\"0\" dy=\"3\"></feOffset>\n                            <feColorMatrix result=\"matrixOut\" in=\"offOut\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0\"></feColorMatrix>\n                            <feGaussianBlur result=\"blurOut\" in=\"matrixOut\" stdDeviation=\"2\"></feGaussianBlur>\n                            <feBlend in=\"SourceGraphic\" in2=\"blurOut\" mode=\"normal\"></feBlend>\n                        </filter>\n                        <marker id=\"start-arrow\" viewBox=\"0 -5 10 10\" refX=\"-6\" markerWidth=\"3\" markerHeight=\"3\" orient=\"auto\"><path d=\"M10,-5L0,0L10,5\"></path></marker>\n                        <marker id=\"end-arrow\" viewBox=\"0 -5 10 10\" refX=\"0\" markerWidth=\"3\" markerHeight=\"3\" orient=\"auto\"><path d=\"M0,-5L10,0L0,5\"></path></marker>\n                        <marker id=\"end-arrow-hover\" viewBox=\"0 -5 10 10\" refX=\"0\" markerWidth=\"3\" markerHeight=\"3\" orient=\"auto\"><path d=\"M0,-5L10,0L0,5\"></path></marker>\n                        <marker id=\"end-arrow-selected\" viewBox=\"0 -5 10 10\" refX=\"0\" markerWidth=\"3\" markerHeight=\"3\" orient=\"auto\"><path d=\"M0,-5L10,0L0,5\"></path></marker>\n                        <radialGradient id=\"linear\" cx=\"50%\" cy=\"50%\" r=\"50%\" fx=\"50%\" fy=\"50%\">\n                            <stop offset=\"0%\" style=\"stop-color:rgb(255，255,255);stop-opacity:0\" />\n                            <stop offset=\"90%\" style=\"stop-color:rgb(255,255,255);stop-opacity:1\" />\n                            <stop offset=\"98%\" style=\"stop-color:rgb(255,255,255);stop-opacity:1\" />\n                            <stop offset=\"100%\" style=\"stop-color:rgb(222，222, 222);stop-opacity:1\" />\n                        </radialGradient>\n                </defs>";

        parent.insertAdjacentHTML("afterbegin", str);
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
        console.log('render graph');
    }

    function Graph(selector) {
        this.parent = select(selector);

        appendPreDefs(this.parent);
    }

    Graph.prototype = {
        constructor: Graph,
        width: width,
        height: height,
        render: render
    };

    function index (selector) {
        return new Graph(selector);
    }

    exports.graph = index;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=g3.js.map
