var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("getUngroupedNodes should not return Node which property _grouped is true", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}]);
    
    myGraph.group([myGraph.nodes()[0], myGraph.nodes()[1]]);
    
    test.deepEqual(myGraph.getUngroupedNodes(), [myGraph.nodes()[2], myGraph.nodes()[3]]);
    
    test.end();
});