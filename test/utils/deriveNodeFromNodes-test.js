var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");


tape("Derive new Node from received Nodes", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1, label: "a", radius: 51, x: 100, y: 100}, {id: 2, label: "b", color: "#445987", x: 200, y: 200}, {id:3, label: "c", x: 300, y: 300}]);

    var nodeObj = g3.utils.deriveNodeFromNodes(myGraph.nodes());
    test.equal(nodeObj.id, "grouped:1&2&3");
    test.equal(nodeObj.label, "a&b&c");
    test.equal(nodeObj.radius, 27);
    test.equal(nodeObj.color, "#56a0ff");
    test.equal(nodeObj.x, 200);
    test.equal(nodeObj.y, 200);

    test.end();
});