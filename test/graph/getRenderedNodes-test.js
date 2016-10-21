var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("Rendered Nodes should exclude transformed Nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id: 2, src: 1, dst: 3}]);

    test.equal(myGraph.getRenderedNodes().length, 3);
    myGraph.nodes()[0].NtoL();
    test.equal(myGraph.getRenderedNodes().length, 2);

    test.end();
});

tape("Rendered Nodes should exclude grouped Nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}]);

    test.equal(myGraph.getRenderedNodes().length, 3);
    myGraph.group([myGraph.nodes()[0], myGraph.nodes()[1]]);
    test.equal(myGraph.getRenderedNodes().length, 2);

    test.end();
});
