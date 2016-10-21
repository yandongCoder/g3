var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Do not transform Node to Link if the Node connect less than two Nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id:1, src: 1, dst: 2}]);

    myGraph.nodes()[0].NtoL();
    test.equal(myGraph.nodes().length, 2);
    test.equal(myGraph.links().length, 1);

    test.end();
});

tape("Do not transform Node to Link if the Node connect more than two Nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 3}, {id:3, src: 1, dst: 4}]);

    myGraph.nodes()[0].NtoL();
    test.equal(myGraph.getRenderedNodes().length, 4);
    test.equal(myGraph.getRenderedLinks().length, 3);

    test.end();
});

tape("Only if Node directly connect two Nodes(one Node between two Nodes), transform this Node to Link ", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id: 2, src: 1, dst: 3}]);

    myGraph.nodes()[0].NtoL();
    myGraph.nodes()[0].NtoL();//冪等性
    test.equal(myGraph.getRenderedNodes().length, 2);
    test.equal(myGraph.nodes()[0].transformed(), true);

    test.equal(myGraph.links().length, 3);
    test.equal(myGraph.getRenderedLinks().length, 1);
    test.equal(myGraph.links()[0].transformed(), true);
    test.equal(myGraph.links()[1].transformed(), true);

    test.deepEqual(myGraph.links()[2].transformedBy.node, myGraph.nodes()[0]);
    test.deepEqual(myGraph.links()[2].transformedBy.links, [myGraph.links()[0], myGraph.links()[1]]);

    test.end();
});

tape("Add new Link to transformed LNL, and transform this Link, it equivalent to transform them together.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id: 2, src: 1, dst: 3}]);

    myGraph.nodes()[0].NtoL();
    myGraph.links({id: 3, src: 1, dst: 2});
    myGraph.nodes()[0].NtoL();

    test.equal(myGraph.links().length, 4);
    test.equal(myGraph.getRenderedLinks().length, 1);

    test.deepEqual(myGraph.links()[3].transformedBy.links, [myGraph.links()[0], myGraph.links()[2], myGraph.links()[1]]);

    myGraph.links()[3].LtoN();

    test.equal(myGraph.getRenderedNodes().length, 3);
    test.equal(myGraph.links().length, 3);
    test.equal(myGraph.getRenderedLinks().length, 3);

    test.end();
});

tape("Merge Links first, then transform to LNL", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id: 3, src: 1, dst: 3}]);

    myGraph.links()[0].merge();
    myGraph.nodes()[0].NtoL();
    test.equal(myGraph.getRenderedNodes().length, 2);

    test.equal(myGraph.links().length, 5);
    test.equal(myGraph.getRenderedLinks().length, 1);
    test.equal(myGraph.links()[0].transformed(), false);
    test.equal(myGraph.links()[1].transformed(), false);
    test.equal(myGraph.links()[2].transformed(), true);
    test.equal(myGraph.links()[3].transformed(), true);

    test.deepEqual(myGraph.links()[4].transformedBy.links, [myGraph.links()[3], myGraph.links()[2]]);

    test.end();
});

tape("Transform to LNL first, then merge Links, it's same as Merge Links first, then transform to LNL", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id: 3, src: 1, dst: 3}]);

    myGraph.nodes()[0].NtoL();
    myGraph.links()[0].merge();
    test.equal(myGraph.getRenderedNodes().length, 2);

    test.equal(myGraph.links().length, 5);
    test.equal(myGraph.getRenderedLinks().length, 1);
    test.equal(myGraph.links()[0].transformed(), false);
    test.equal(myGraph.links()[1].transformed(), false);
    test.equal(myGraph.links()[2].transformed(), true);
    test.equal(myGraph.links()[3].transformed(), true);

    test.deepEqual(myGraph.links()[4].transformedBy.links, [myGraph.links()[3], myGraph.links()[2]]);

    test.end();
});
