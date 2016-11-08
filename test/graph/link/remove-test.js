var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Remove a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false});


    myGraph.nodes([{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}]);
    var links = [{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 1, dst: 5}, {id: 4, src: 5, dst: 6}, {id: 5, src: 5, dst: 2}];
    myGraph.links(links);

    test.equal(myGraph.links().length, 5);

    myGraph.links()[0].remove();

    test.equal(myGraph.links().length, 4);
    test.equal(getLinkLenById(1), 0);

    test.end();

    function getLinkLenById (id){
        return myGraph.links().filter(function(Link){ return Link.id === id }).length;
    }
});

tape("Remove a merged Link will remove Links in mergedBy too", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}]);
    
    myGraph.links()[0].merge();
    
    myGraph.links()[3].remove();
    test.equal(myGraph.links().length, 0);
    
    test.end();
});

tape("Remove a transformed Link(N2L) will remove Links and Nodes in transformedBy too", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id: 2, src: 1, dst: 3}]);
    
    myGraph.nodes()[0].NtoL();
    myGraph.links()[2].remove();
    test.equal(myGraph.nodes().length, 2);
    test.equal(myGraph.links().length, 0);
    
    test.end();
});
