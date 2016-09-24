var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");

tape("rendered Nodes should exclude transformed Nodes", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id: 2, src: 1, dst: 3}]);

    test.equal(myGraph.getRenderedNodes().length, 3);
    myGraph.nodes()[0].NtoL();
    test.equal(myGraph.getRenderedNodes().length, 2);

    test.end();
});
