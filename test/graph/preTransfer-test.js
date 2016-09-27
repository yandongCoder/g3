var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("If any one of links Data between a couple Nodes marked merged, then merge them", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2, merged: true}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);
    
    test.equal(myGraph.links().length, 5);
    test.equal(myGraph.getRenderedLinks().length, 2);
    test.deepEqual(myGraph.links()[4].mergedBy, [myGraph.links()[0], myGraph.links()[1], myGraph.links()[2]]);
    test.end();
    
});

tape("PreMerge using flatten merge, so not has nested mergedBy", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2, merged: true}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    myGraph.links({id:5, src: 2, dst: 1, merged: true});
    test.deepEqual(myGraph.links()[5].mergedBy, [myGraph.links()[0], myGraph.links()[1], myGraph.links()[2], myGraph.links()[4]]);
    test.end();

});

tape("If a new kink added to mergedLinks between couple Nodes, merged only if new link's merge is true, otherwise not", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2, merged: true}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    test.equal(myGraph.links().length, 5);
    test.equal(myGraph.getRenderedLinks().length, 2);

    myGraph.links({id:5, src: 2, dst: 1});
    test.equal(myGraph.links().length, 6);
    test.equal(myGraph.getRenderedLinks().length, 3);
    test.deepEqual(myGraph.links()[4].mergedBy, [myGraph.links()[0], myGraph.links()[1], myGraph.links()[2]]);
    test.end();

});

tape("Auto transform added new Link to LNL, if new Link's source or target is transformed", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id: 2, src: 1, dst: 3}]);

    myGraph.nodes()[0].NtoL();
    myGraph.links({id: 3, src: 1, dst: 2});

    test.equal(myGraph.links().length, 4);
    test.equal(myGraph.getRenderedLinks().length, 1);

    test.deepEqual(myGraph.links()[3].transformedBy.links, [myGraph.links()[0], myGraph.links()[2], myGraph.links()[1]]);

    test.end();
});

tape("If Node's 'transformed' is marked, transform this Node", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1}, {id: 2, transformed: true}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    test.equal(myGraph.links().length, 5);
    test.equal(myGraph.getRenderedLinks().length, 1);
    test.deepEqual(myGraph.links()[4].transformedBy.links, [myGraph.links()[0], myGraph.links()[1], myGraph.links()[2], myGraph.links()[3]]);
    test.end();

});