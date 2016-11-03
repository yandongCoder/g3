var tape = require("tape"),
    g3 = require("../../dist/js/g3");

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
