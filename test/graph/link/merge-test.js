var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Merge all Links between a couple Nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    //merge many times equal merge one time, idempotent (幂等性)
    myGraph.links()[0].merge();
    myGraph.links()[0].merge();
    myGraph.links()[1].merge();

    test.equal(myGraph.links().length, 5);
    test.equal(myGraph.getRenderedLinks().length, 2);
    test.deepEqual(myGraph.links()[4].mergedBy.links, [myGraph.links()[0], myGraph.links()[1], myGraph.links()[2]]);
    test.end();

});

tape("Don't merge Link if only one Link between a couple Nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    myGraph.links()[3].merge();
    test.equal(myGraph.links().length, 4);
    test.equal(myGraph.getRenderedLinks().length, 4);
    test.end();

});

tape("Merge Links that has been transformed(NtoL)", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    myGraph.nodes()[1].NtoL();
    myGraph.links()[0].merge();
    test.equal(myGraph.links().length, 6);
    test.equal(myGraph.getRenderedLinks().length, 1);
    test.end();

});

tape("Grouped Links could not apply merge operation.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    myGraph.group([myGraph.nodes()[0], myGraph.nodes()[1]]);
    myGraph.links()[0].merge();
    test.equal(myGraph.links().length, 4);
    test.equal(myGraph.getRenderedLinks().length, 1);
    test.end();

});

tape("Merge Links, add new Link between this couple Nodes, merge again.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);
    
    myGraph.links()[0].merge();
    test.equal(myGraph.links().length, 5);
    test.equal(myGraph.getRenderedLinks().length, 2);
    
    myGraph.links({id: 5, src: 1, dst: 2});
    test.equal(myGraph.links().length, 6);
    test.equal(myGraph.getRenderedLinks().length, 3);
    
    myGraph.links()[1].merge();//idempotent (幂等性)
    
    test.equal(myGraph.links().length, 7);
    test.equal(myGraph.getRenderedLinks().length, 2);
    test.deepEqual(myGraph.links()[6].mergedBy.links, [myGraph.links()[4], myGraph.links()[5]]);
    test.deepEqual(myGraph.links()[6].mergedBy.links[0], myGraph.links()[4]);
    test.end(); 

});