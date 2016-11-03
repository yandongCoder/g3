var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("Grid layout will make Nodes in a grid network", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]);

    var myGrid = myGraph.gridLayout().nodeSize([100, 100]).padding([70, 70]);

    myGrid([myGraph.nodes()[0], myGraph.nodes()[1], myGraph.nodes()[2], myGraph.nodes()[3]]);

    test.equal(myGraph.nodes()[2].x,  0);
    test.equal(myGraph.nodes()[2].y,  170);
    test.equal(myGraph.nodes()[3].x,  170);
    test.equal(myGraph.nodes()[3].y,  170);
    test.equal(myGraph.nodes()[4].x,  undefined);
    test.end();
});
