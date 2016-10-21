var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("Push new node to graph's nodes", function(test){
    //global.window = document.defaultView;
    //global.document = document;
    
    var myGraph = g3.graph(null, {ifRender: false});

    
    //last could not add
    myGraph.nodes([{id: 1, label: "A", x: 50, y: 50}, {id: 2, label: "A", x: 100, y: 100},{id: 2, label: "A", x: 130, y: 130}]);
    test.equal(myGraph.nodes().length, 2);


    //could not add
    myGraph._addNode({id: 2, label: "X", x: 100, y: 120});
    test.equal(myGraph.nodes().length, 2);

    
    //could add
    myGraph._addNode({id: 3, label: "X", x: 100, y: 120});
    test.equal(myGraph.nodes().length, 3);

    test.end();
});