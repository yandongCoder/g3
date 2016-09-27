var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("Get contained Links of Nodes", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}])
        .links([{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 3, dst: 2}, {id: 4, src: 3, dst: 4}]);

    test.deepEqual(myGraph.getContainLinks([myGraph.nodes()[0], myGraph.nodes()[1]]), [myGraph.links()[0]]);
    test.deepEqual(myGraph.getContainLinks([myGraph.nodes()[1], myGraph.nodes()[2]]), [myGraph.links()[1], myGraph.links()[2]]);
    test.deepEqual(myGraph.getContainLinks([myGraph.nodes()[1], myGraph.nodes()[2], myGraph.nodes()[3]]), [myGraph.links()[1], myGraph.links()[2], myGraph.links()[3]]);

    test.end();
});

tape("Get contained Links of Nodes should exclude merged Links", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}])
        .links([{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 3, dst: 2}, {id: 4, src: 3, dst: 4}]);

    myGraph.links()[1].merge();
    test.deepEqual(myGraph.getContainLinks([myGraph.nodes()[1], myGraph.nodes()[2]]), [myGraph.links()[4]]);

    test.end();
});

tape("Get contained Links of Nodes should exclude transformed Links", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}])
        .links([{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 3, dst: 2}, {id: 4, src: 3, dst: 4}]);

    myGraph.nodes()[1].NtoL();
    test.deepEqual(myGraph.getContainLinks([myGraph.nodes()[0], myGraph.nodes()[2]]), [myGraph.links()[4]]);

    test.end();
});
