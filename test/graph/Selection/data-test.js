var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Get data of Selection", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2},{id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}]);
    
    test.deepEqual(myGraph.getNodesOP([2, 3]).data(), myGraph.getNodes([2, 3]));
    test.deepEqual(myGraph.getLinksOP(1).data(), myGraph.getLinks(1));
    
    test.end();
});