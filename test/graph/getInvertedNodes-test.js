var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("Get inverse Nodes ", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}]);

    test.deepEqual(myGraph.getInvertedNodes(myGraph.nodes()[0]), [myGraph.nodes()[1]]);

    test.end();
});