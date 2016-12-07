var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("init D3 zoom correctly", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    var myGraph = g3.graph(svg)._render();
    
    test.notEqual(myGraph.zoom, undefined);

    test.end();
    
});
