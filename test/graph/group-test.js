var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");

tape("Group two nodes", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 2, dst: 3}, {id: 3, src: 3, dst: 4}]);

    myGraph.group([myGraph.nodes()[1], myGraph.nodes()[2]]);

    test.equal(myGraph.nodes().length, 5);
    test.equal(myGraph.getRenderedNodes().length, 3);

    test.equal(myGraph.getRenderedLinks().length, 2);

    test.end();
});