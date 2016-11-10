var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("Add nodes to graph", function(test){
    var myGraph = g3.graph(null, {ifRender: false});

    //last could not add
    myGraph.nodes([{id: 1, label: "A", x: 50, y: 50}, {id: 2, label: "A", x: 100, y: 100},{id: 2, label: "A", x: 130, y: 130}]);
    test.equal(myGraph.nodes().length, 2);


    //could not add
    myGraph.nodes({id: 2, label: "X", x: 100, y: 120});
    test.equal(myGraph.nodes().length, 2);

    //could add
    myGraph.nodes({id: 3, label: "X", x: 100, y: 120});
    test.equal(myGraph.nodes().length, 3);


    //could add
    myGraph.nodes({label: "X", x: 100, y: 120});
    test.equal(myGraph.nodes().length, 4);
    //could not add
    myGraph.nodes({label: "X", x: 100, y: 120});
    test.equal(myGraph.nodes().length, 4);
    
    test.end();
});

tape("Push new nodes and cover graph's current nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false});

    //add
    myGraph.nodes([{id: 1, label: "A", x: 50, y: 50}, {id: 2, label: "A", x: 100, y: 100},{id: 3, label: "A", x: 130, y: 130}]);
    test.equal(myGraph.nodes().length, 3);


    //cover
    myGraph.nodes({id: 4, label: "X", x: 100, y: 120}, true);
    test.equal(myGraph.nodes().length, 1);


    test.end();
});

tape("Add a grouped Node to graph", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, grouped: true}, {id: 2, grouped: true},{id: 3}, {id: 4, groupedBy:{nodes: [1, 2], links:[1], attachedLinks: [2]}}])
        .links([{id:1, src: 1, dst: 2, grouped: true}, {id:2, src: 2, dst: 3}]);
    
    test.deepEqual(myGraph.getRenderedNodes(), myGraph.getNodes([3, 4]));
    test.deepEqual(myGraph.getRenderedLinks(), myGraph.getLinks([2]));
    
    myGraph.nodes()[3].ungroup();
    test.deepEqual(myGraph.getRenderedNodes(), myGraph.getNodes([1, 2, 3]));
    test.deepEqual(myGraph.getRenderedLinks(), myGraph.getLinks([1, 2]));
    
    test.end();
});
