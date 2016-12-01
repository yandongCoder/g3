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
    
    //by attr
    test.deepEqual(myGraph.getNodes('id', 2), [myGraph.nodes()[1]]);
    
    //get all
    test.equal(myGraph.getNodes().length, 6);

    test.end();
    
});

//getRenderedNodes
tape("Rendered Nodes should exclude hide Nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}]);
    
    myGraph.nodes()[0].attr("hide", true);
    test.equal(myGraph.getRenderedNodes().length, 0);
    
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

// tape("Get Nodes Selection", function(test){
//
// });