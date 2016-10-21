var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("move X, Y to Node's center point, rather than LeftTop point", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0, radius: 15}, {id: 2, x: 100, y: 100, radius: 200}, {id: 3, x: -100, y: 0, radius: 100}]);

    test.equal(myGraph.nodes()[0].getX(), 0);
    test.equal(myGraph.nodes()[0].getY(), 0);
    test.equal(myGraph.nodes()[1].getX(), 100);
    test.equal(myGraph.nodes()[1].getY(), 100);
    test.equal(myGraph.nodes()[2].getX(), -100);
    test.equal(myGraph.nodes()[2].getY(), 0);
    
    test.end();
});
