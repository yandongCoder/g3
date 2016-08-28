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
        var str = "<defs></defs>";
        [1, 2, 3].map(function (n) {
            return n + 1;
        });

        parent.insertAdjacentHTML("afterbegin", str);
    }

    function width (width) {
        if (!arguments.length) {
            console.log('get width');
        }
        console.log('set width: ' + width);

        return this;
    }

    function height (height) {
        if (!arguments.length) {
            console.log('get height');
        }
        console.log('set height: ' + height);

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
