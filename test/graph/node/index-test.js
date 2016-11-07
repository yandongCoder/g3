var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("data's property should not cover Node's method or property already has.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, nudge: 123}]);
    
    test.notEqual(myGraph.nodes()[0].nudge, 123);
    
    test.end();
});
