var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");

tape("Get attached Links of Nodes", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");


    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}])
        .links([{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 3, dst: 2}, {id: 4, src: 3, dst: 4}]);

    test.deepEqual(myGraph.getAttachedLinks([myGraph.nodes()[0], myGraph.nodes()[1]]), [myGraph.links()[1], myGraph.links()[2]]);
    test.deepEqual(myGraph.getAttachedLinks([myGraph.nodes()[1], myGraph.nodes()[2]]), [myGraph.links()[0], myGraph.links()[3]]);
    test.deepEqual(myGraph.getAttachedLinks([myGraph.nodes()[1], myGraph.nodes()[2], myGraph.nodes()[3]]), [myGraph.links()[0]]);

    test.end();
});