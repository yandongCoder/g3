var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("FindShortestPath will return Nodes and Links in this path", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}])
        .links([{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 2, dst: 4}, {id: 4, src: 4, dst: 5}, {id: 5, src: 4, dst: 6}, {id: 6, src: 6, dst: 7}, {id: 7, src: 7, dst: 8}, {id: 8, src: 6, dst: 8}]);

    var path = myGraph.findShortestPath(myGraph.nodes()[0], myGraph.nodes()[7]);
    test.equal(path.distance, 4);
    test.deepEqual(path.nodes, [myGraph.nodes()[0], myGraph.nodes()[1], myGraph.nodes()[3], myGraph.nodes()[5], myGraph.nodes()[7]]);
    test.deepEqual(path.links, [myGraph.links()[0], myGraph.links()[2], myGraph.links()[4], myGraph.links()[7]]);
    
    test.end();
});