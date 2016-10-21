var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("get and set radius of a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0, radius: 30}, {id: 2, x: 100, y: 0}]);

    test.equal(myGraph.nodes()[0].radius(), 30);
    test.equal(myGraph.nodes()[1].radius(), 15);
    myGraph.nodes()[0].radius(40);
    test.equal(myGraph.nodes()[0].radius(), 40);


    test.end();
});
