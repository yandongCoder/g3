var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("get and set color of a Node", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1, x: 0, y: 0, color: "red"}, {id: 2, x: 100, y: 0}]);

    test.equal(myGraph.nodes()[0].color(), "red");
    test.equal(myGraph.nodes()[1].color(), "#123456");
    myGraph.nodes()[0].color('#666888');
    test.equal(myGraph.nodes()[0].color(), "#666888");


    test.end();
});
