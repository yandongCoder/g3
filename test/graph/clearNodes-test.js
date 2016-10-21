var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("clear all nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false});
    
    myGraph.nodes([{id: 1, label: "A", x: 50, y: 50}, {id: 2, label: "A", x: 100, y: 100},{id: 2, label: "A", x: 130, y: 130}]);
    test.equal(myGraph.nodes().length, 2);
    myGraph.clearNodes();
    test.equal(myGraph.nodes().length, 0);

    test.end();
});