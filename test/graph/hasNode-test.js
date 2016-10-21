var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("Don't add node if node's id repeated in graph's _nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false});

    var nodes = [{id: 1, label: "A", x: 50, y: 50}, {id: 2, label: "A", x: 100, y: 100},{id: 2, label: "A", x: 130, y: 130}];
    myGraph.nodes(nodes);
    test.equal(myGraph.nodes().length, 2);

    //only compare ID
    test.equal(myGraph.hasNode({id: 1, label: "A", x: 50, y: 50}), true);
    test.equal(myGraph.hasNode({id: 1, label: "X", x: 1220, y: 12350}), true);
    test.equal(myGraph.hasNode(nodes[1]), true);
    test.equal(myGraph.hasNode({id: 99, label: "A", x: 50, y: 50}), false);
    test.end();
});
