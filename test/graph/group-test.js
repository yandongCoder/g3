var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("Group two Nodes which contain a Link, attach no Links", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 2, dst: 3}]);

    myGraph.group([myGraph.nodes()[0], myGraph.nodes()[1]]);
    myGraph.group([myGraph.nodes()[0], myGraph.nodes()[1]]);//幂等性

    test.equal(myGraph.getRenderedNodes().length, 2);

    test.equal(myGraph.nodes()[0].grouped(), true);
    test.equal(myGraph.nodes()[1].grouped(), true);
    test.deepEqual(myGraph.nodes()[3].groupedBy.nodes, [myGraph.nodes()[0], myGraph.nodes()[1]]);
    test.deepEqual(myGraph.nodes()[3].groupedBy.links, [myGraph.links()[0]]);
    test.deepEqual(myGraph.nodes()[3].groupedBy.attachedLinks, [{"link": myGraph.links()[1], "source": myGraph.nodes()[1]}]);

    test.deepEqual(myGraph.links()[1].source, myGraph.nodes()[3]);

    test.end();
});

tape("A Node could only grouped once.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 2, dst: 3}]);

    myGraph.group([myGraph.nodes()[0], myGraph.nodes()[1]]);
    myGraph.group([myGraph.nodes()[1], myGraph.nodes()[2]]);

    test.equal(myGraph.nodes().length, 4);
    test.equal(myGraph.getRenderedNodes().length, 2);

    test.equal(myGraph.nodes()[0].grouped(), true);
    test.equal(myGraph.nodes()[1].grouped(), true);
    test.deepEqual(myGraph.nodes()[3].groupedBy.nodes, [myGraph.nodes()[0], myGraph.nodes()[1]]);
    test.deepEqual(myGraph.nodes()[3].groupedBy.links, [myGraph.links()[0]]);

    test.end();
});

tape("Can't group only one node.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes({id: 1});

    myGraph.group(myGraph.nodes());

    test.equal(myGraph.nodes().length, 1);

    test.end();
});