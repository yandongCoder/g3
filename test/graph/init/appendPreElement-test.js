var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("append element container correctly", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    g3.graph(svg).render();

    test.notEqual(svg.querySelector("g.brush"), null);
    test.notEqual(svg.querySelector("g.force"), null);
    test.notEqual(svg.querySelector("g.force").querySelector('g.links'), null);
    test.notEqual(svg.querySelector("g.force").querySelector('g.nodes'), null);

    test.end();
});
