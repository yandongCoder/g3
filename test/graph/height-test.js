var tape = require("tape"),
    jsdom = require("jsdom");
    g3 = require("../../dist/js/g3");

tape("set height, and get it back", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    var myGraph = g3.graph(svg)
        .height(300);

    test.equal(myGraph.height(), 300);


    test.end();
});
