var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("Select Nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}]);

    myGraph.selectNodes([1, 2]);
    test.equal(myGraph.nodes()[0].selected(), true);
    test.equal(myGraph.nodes()[1].selected(), true);

    test.end();
});

tape("Unselect other Nodes, if second argument of selectNodes method is true", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}]);

    myGraph.selectNodes(1);
    myGraph.selectNodes(2, true);
    test.equal(myGraph.nodes()[0].selected(), false);
    test.equal(myGraph.nodes()[1].selected(), true);

    test.end();
});

tape("If a grouped Node is grouped from Nodes is all selected, grouped Node is selected too", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}]);

    myGraph.selectNodes([1, 2]);
    myGraph.group([1, 2]);
    test.equal(myGraph.nodes()[2].selected(), true);

    test.end();
});

tape("If a grouped Node is grouped from Nodes is not all selected, grouped Node is selected too", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}]);

    myGraph.selectNodes(1);
    myGraph.group([1, 2]);
    test.equal(myGraph.nodes()[2].selected(), false);

    test.end();
});