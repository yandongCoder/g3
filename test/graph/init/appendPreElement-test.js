var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("append element container correctly", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    g3.graph(svg)._render();

    test.notEqual(svg.querySelector("g.brush"), null);
    test.notEqual(svg.querySelector("g.graph-group"), null);
    test.notEqual(svg.querySelector("g.graph-group").querySelector('g.links'), null);
    test.notEqual(svg.querySelector("g.graph-group").querySelector('g.nodes'), null);

    test.end();
});
