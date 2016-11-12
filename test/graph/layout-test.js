var tape = require("tape"),
    g3 = require("../../dist/js/g3");

//Force layout
tape("Force layout", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]);

    var forceLayout = myGraph
        .forceLayout()
        .nodes(myGraph.nodes())
        .force("link", d3.forceLink(myGraph.links()).distance(200).strength(1))
        .force("charge", d3.forceManyBody());

    for (var i = 300; i--;) {
        forceLayout.tick();
    }

    test.notEqual(myGraph.nodes()[2].x, undefined);
    test.end();
});

//Grid layout
tape("Grid layout will make Nodes in a grid network", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]);
    
    var myGrid = myGraph.gridLayout().nodeSize([100, 100]).padding([70, 70]);
    
    myGrid([myGraph.nodes()[0], myGraph.nodes()[1], myGraph.nodes()[2], myGraph.nodes()[3]]);
    
    test.equal(myGraph.nodes()[2].x,  0);
    test.equal(myGraph.nodes()[2].y,  170);
    test.equal(myGraph.nodes()[3].x,  170);
    test.equal(myGraph.nodes()[3].y,  170);
    test.equal(myGraph.nodes()[4].x,  0);
    test.end();
});

//HierarchyLayout method
tape("Hierarchy layout", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]);
    
    //myGraph.hierarchyLayout(myGraph.nodes(), myGraph.links(), 500, 500);
    
    //test.notEqual(myGraph.nodes()[2].x, undefined);
    test.end();
});
