var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("Hierarchy layout", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]);

    //myGraph.hierarchyLayout(myGraph.nodes(), myGraph.links(), 500, 500);

    //test.notEqual(myGraph.nodes()[2].x, undefined);
    test.end();
});
