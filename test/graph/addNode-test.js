var tape = require("tape"),
    jsdom = require("jsdom");
g3 = require("../../dist/js/g3");

tape("push new nodes to graph's nodes", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg);

    //last could not add
    myGraph.nodes([{id: 1, label: "A", x: 50, y: 50}, {id: 2, label: "A", x: 100, y: 100},{id: 2, label: "A", x: 130, y: 130}]);
    test.equal(myGraph.nodes().length, 2);


    //could not add
    myGraph.addNode({id: 2, label: "X", x: 100, y: 120});
    test.equal(myGraph.nodes().length, 2);

    
    //could add
    myGraph.addNode({id: 3, label: "X", x: 100, y: 120});
    test.equal(myGraph.nodes().length, 3);

    test.end();
});