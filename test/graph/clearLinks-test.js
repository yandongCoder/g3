var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("clear all links", function(test){
    var myGraph = g3.graph(null, {ifRender: false});

    myGraph.nodes([{id: 1, label: "A", x: 50, y: 50}, {id: 2, label: "A", x: 100, y: 100},{id: 3, label: "A", x: 130, y: 130}]);
    myGraph.links([{id: 1, label: "A->B", src: 1, dst: 2,direction: 0},{id: 2, label: "C->D", src: 3, dst: 2,direction: 3}]);

    test.equal(myGraph.links().length, 2);
    myGraph.clearLinks();
    test.equal(myGraph.links().length, 0);

    test.end();
});