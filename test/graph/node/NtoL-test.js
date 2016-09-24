var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("Do not transform Node to Link if the Node connect less than two Nodes", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}])
        .links([{id:1, src: 1, dst: 2}]);

    myGraph.nodes()[0].NtoL();
    test.equal(myGraph.nodes().length, 2);
    test.equal(myGraph.links().length, 1);

    test.end();
});

tape("Do not transform Node to Link if the Node connect more than two Nodes", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 3}, {id:3, src: 1, dst: 4}]);

    myGraph.nodes()[0].NtoL();
    test.equal(myGraph.getRenderedNodes().length, 4);
    test.equal(myGraph.getRenderedLinks().length, 3);

    test.end();
});

tape("Only if Node directly connect two Nodes(one Node between two Nodes), transform this Node to Link ", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id: 2, src: 1, dst: 3}]);

    myGraph.nodes()[0].NtoL();
    test.equal(myGraph.nodes().length, 3);
    test.equal(myGraph.getRenderedNodes().length, 2);
    test.equal(myGraph.nodes()[0].transformed(), true);

    test.equal(myGraph.links().length, 3);
    test.equal(myGraph.getRenderedLinks().length, 1);
    test.equal(myGraph.links()[0].transformed(), true);
    test.equal(myGraph.links()[1].transformed(), true);

    test.end();
});
