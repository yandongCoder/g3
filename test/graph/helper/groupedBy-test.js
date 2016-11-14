var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("getOriginalNodes will return original Nodes of grouped Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 2, dst: 3}]);
    
    myGraph.group([myGraph.nodes()[0], myGraph.nodes()[1]]);
    myGraph.group([myGraph.nodes()[2], myGraph.nodes()[3]]);

    var N = myGraph.nodes(),
        L = myGraph.links();
    //order matters
    test.deepEqual(N[4].groupedBy.getOriginalNodes(), [N[2],N[0],N[1]]);
    test.deepEqual(N[4].groupedBy.getContainLinks(), [L[1],L[0]]);
    test.end();
});
