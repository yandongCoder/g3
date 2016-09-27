var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Nudge a Node", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1, x: 5, y: 0}, {id: 2, x: 100, y: 0}]);
    
    test.equal(myGraph.nodes()[0].getX(), 5);
    test.equal(myGraph.nodes()[0].getY(), 0);
    test.equal(myGraph.nodes()[1].getX(), 100);
    test.equal(myGraph.nodes()[1].getY(), 0);

    myGraph.nodes()[0].nudge(10, 10);
    test.equal(myGraph.nodes()[0].getX(), 15);
    test.equal(myGraph.nodes()[0].getY(), 10);


    test.end();
});
