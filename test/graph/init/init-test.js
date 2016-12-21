var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("A graph call init only once in first render", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    myGraph = g3.graph(svg);
    myGraph._render();
    myGraph._render();

    test.equal(svg.querySelectorAll("defs").length, 1);
    test.equal(svg.querySelectorAll("g.brush").length, 1);
    test.equal(svg.querySelectorAll("g.graph-group").length, 1);
    test.end();
});