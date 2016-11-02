var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("get linked Nodes by direction", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}])
        .links([{id: 1, src: 1, dst: 2, direction: 0}, {id: 2, src: 1, dst: 3, direction: 1}, {id: 3, src: 1, dst: 4, direction: 2}, {id: 4, src: 1, dst: 5, direction: 3}, {id: 5, src: 1, dst: 6}]);

    test.deepEqual(myGraph.getLinkedNodes(myGraph.nodes()[0], "none"), [myGraph.nodes()[1]]);
    test.deepEqual(myGraph.getLinkedNodes(myGraph.nodes()[0], "out"), [myGraph.nodes()[2], myGraph.nodes()[5]]);
    test.deepEqual(myGraph.getLinkedNodes(myGraph.nodes()[0], "in"), [myGraph.nodes()[3]]);
    test.deepEqual(myGraph.getLinkedNodes(myGraph.nodes()[0], "double"), [myGraph.nodes()[4]]);
    test.deepEqual(myGraph.getLinkedNodes(myGraph.nodes()[0], "all"), [myGraph.nodes()[1], myGraph.nodes()[2], myGraph.nodes()[3], myGraph.nodes()[4], myGraph.nodes()[5]]);

    test.end();
});