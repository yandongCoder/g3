var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("Get and set _grouped property of a Node", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");


    var myGraph = g3.graph(svg)
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}]);

    test.equal(myGraph.nodes()[0].grouped(), false);
    myGraph.nodes()[0].grouped(true);
    test.equal(myGraph.nodes()[0].grouped(), true);
    myGraph.nodes()[0].grouped(false);
    test.equal(myGraph.nodes()[0].grouped(), false);

    test.end();
});
