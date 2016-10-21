var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Get and set _grouped property of a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}]);

    test.equal(myGraph.nodes()[0].grouped(), false);
    myGraph.nodes()[0].grouped(true);
    test.equal(myGraph.nodes()[0].grouped(), true);
    myGraph.nodes()[0].grouped(false);
    test.equal(myGraph.nodes()[0].grouped(), false);

    test.end();
});
