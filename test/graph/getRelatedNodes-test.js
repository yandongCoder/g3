var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("get Nodes related to received Nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}])
        .links([{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 4, dst: 5}]);

    test.deepEqual(myGraph.getRelatedNodes([myGraph.nodes()[0], myGraph.nodes()[3]]), [myGraph.nodes()[1], myGraph.nodes()[4], myGraph.nodes()[2]]);
    
    test.end();
});