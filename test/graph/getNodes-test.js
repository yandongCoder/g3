var tape = require("tape"),
    g3 = require("../../dist/js/g3");

//getNodes
tape("Get nodes by id filter", function(test){
    var myGraph = g3.graph(null, {ifRender: false});


    var nodes = [{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}];
    myGraph.nodes(nodes);

    test.equal(myGraph.nodes().length, 6);
    //by Id
    test.deepEqual(myGraph.getNodes(1), [myGraph.nodes()[0]]);

    //by Node
    test.deepEqual(myGraph.getNodes(myGraph.nodes()[3]), [myGraph.nodes()[3]]);

    //by Id array
    test.deepEqual(myGraph.getNodes([4, 5]), [myGraph.nodes()[3], myGraph.nodes()[4]]);


    //by Id obj
    test.deepEqual(myGraph.getNodes({id: 6}), [myGraph.nodes()[5]]);

    //by Id obj Array
    test.deepEqual(myGraph.getNodes([{id: 5}, {id: 6}]), [myGraph.nodes()[4], myGraph.nodes()[5]]);

    //get all
    test.equal(myGraph.getNodes().length, 6);

    test.end();
    
});

//getInvertedNodes
tape("Get inverse Nodes ", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}]);
    
    test.deepEqual(myGraph.getInvertedNodes(myGraph.nodes()[0]), [myGraph.nodes()[1]]);
    
    test.end();
});

//getLinkedNodes
tape("Get linked Nodes by direction", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}])
        .links([{id: 1, src: 1, dst: 2, direction: 0}, {id: 2, src: 1, dst: 3, direction: 1}, {id: 3, src: 1, dst: 4, direction: 2}, {id: 4, src: 1, dst: 5, direction: 3}, {id: 5, src: 1, dst: 6}]);
    
    test.deepEqual(myGraph.getLinkedNodes(myGraph.nodes()[0], "none"), [myGraph.nodes()[1]]);
    test.deepEqual(myGraph.getLinkedNodes(myGraph.nodes()[0], "out"), [myGraph.nodes()[2], myGraph.nodes()[5]]);
    test.deepEqual(myGraph.getLinkedNodes(myGraph.nodes()[0], "in"), [myGraph.nodes()[3]]);
    test.deepEqual(myGraph.getLinkedNodes(myGraph.nodes()[0], "double"), [myGraph.nodes()[4]]);
    test.deepEqual(myGraph.getLinkedNodes(myGraph.nodes()[0], "all"), [myGraph.nodes()[1], myGraph.nodes()[2], myGraph.nodes()[3], myGraph.nodes()[4], myGraph.nodes()[5]]);
    
    test.end();
});

//getRelatedNodes
tape("Get Nodes related to received Nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}])
        .links([{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 4, dst: 5}]);
    
    test.deepEqual(myGraph.getRelatedNodes([myGraph.nodes()[0], myGraph.nodes()[3]]), [myGraph.nodes()[1], myGraph.nodes()[4], myGraph.nodes()[2]]);
    
    test.end();
});

//getRenderedNodes
tape("Rendered Nodes should exclude transformed Nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id: 2, src: 1, dst: 3}]);
    
    test.equal(myGraph.getRenderedNodes().length, 3);
    myGraph.nodes()[0].NtoL();
    test.equal(myGraph.getRenderedNodes().length, 2);
    
    test.end();
});

tape("Rendered Nodes should exclude grouped Nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}]);
    
    test.equal(myGraph.getRenderedNodes().length, 3);
    myGraph.group([myGraph.nodes()[0], myGraph.nodes()[1]]);
    test.equal(myGraph.getRenderedNodes().length, 2);
    
    test.end();
});

//getSelectedNodes
tape("Get selected nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false});
    
    
    var nodes = [{id: 1, selected: true}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}];
    myGraph.nodes(nodes);
    
    myGraph.nodes()[2].attr("selected",true);
    
    
    test.equal(myGraph.getSelectedNodes().length, 2);
    test.end();
    
});

//getUngroupedNodes
tape("getUngroupedNodes should not return Node which property _grouped is true", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}]);
    
    myGraph.group([myGraph.nodes()[0], myGraph.nodes()[1]]);
    
    test.deepEqual(myGraph.getUngroupedNodes(), [myGraph.nodes()[2], myGraph.nodes()[3]]);
    
    test.end();
});
