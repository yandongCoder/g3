var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("Inverse current selection", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}]);

    myGraph.selectNodes(1);
    myGraph.inverseSelection();
    test.equal(myGraph.nodes()[0].selected(), false);
    test.equal(myGraph.nodes()[1].selected(), true);

    test.end();
});