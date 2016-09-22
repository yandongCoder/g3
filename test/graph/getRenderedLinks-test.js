var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");

tape("rendered Links should exclude transformed Links", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id: 2, src: 1, dst: 3}]);

    test.equal(myGraph.getRenderedLinks().length, 2);
    myGraph.nodes()[0].NtoL();
    test.equal(myGraph.getRenderedLinks().length, 1);

    test.end();
});

tape("rendered Links should exclude merged Links", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}])
        .links([{id:1, src: 1, dst: 2}, {id: 2, src: 2, dst: 1}]);

    test.equal(myGraph.getRenderedLinks().length, 2);
    myGraph.links()[0].merge();
    test.equal(myGraph.getRenderedLinks().length, 1);

    test.end();
});