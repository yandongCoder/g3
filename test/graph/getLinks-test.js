var tape = require("tape"),
    g3 = require("../../dist/js/g3");

//getLinks
tape("get links by id filter", function(test){
    var myGraph = g3.graph(null, {ifRender: false});
    
    myGraph.nodes([{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}]);
    var links = [{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 1, dst: 5}, {id: 4, src: 5, dst: 6}, {id: 5, src: 5, dst: 2}];
    myGraph.links(links);

    test.equal(myGraph.links().length, 5);
    //by Id
    test.deepEqual(myGraph.getLinks(1), [myGraph.links()[0]]);

    //by Link
    test.deepEqual(myGraph.getLinks(myGraph.links()[3]), [myGraph.links()[3]]);

    //by Id array
    test.deepEqual(myGraph.getLinks([4, 5]), [myGraph.links()[3], myGraph.links()[4]]);


    //by Id obj
    test.deepEqual(myGraph.getLinks({id: 2}), [myGraph.links()[1]]);
    
    //by attr
    test.deepEqual(myGraph.getLinks('id', 2), [myGraph.links()[1]]);

    //by Id obj Array
    test.deepEqual(myGraph.getLinks([{id: 2}, {id: 3}]), [myGraph.links()[1], myGraph.links()[2]]);
    test.end();
    
});

//getAttachedLinks
tape("Get attached Links of Nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}])
        .links([{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 3, dst: 2}, {id: 4, src: 3, dst: 4}]);
    
    test.deepEqual(myGraph.getAttachedLinks([myGraph.nodes()[0], myGraph.nodes()[1]]), [myGraph.links()[2], myGraph.links()[1]]);
    test.deepEqual(myGraph.getAttachedLinks([myGraph.nodes()[1], myGraph.nodes()[2]]), [myGraph.links()[3], myGraph.links()[0]]);
    test.deepEqual(myGraph.getAttachedLinks([myGraph.nodes()[1], myGraph.nodes()[2], myGraph.nodes()[3]]), [myGraph.links()[0]]);
    
    test.end();
});


tape("Rendered Links should exclude hided Links", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id:1, src: 1, dst: 2}]);
    
    myGraph.links()[0].attr('hide', true);
    test.equal(myGraph.getRenderedLinks().length, 0);
    
    test.end();
});

//getContainLinks
tape("Get contained Links of Nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}])
        .links([{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 3, dst: 2}, {id: 4, src: 3, dst: 4}]);
    
    test.deepEqual(myGraph.getContainLinks([myGraph.nodes()[0], myGraph.nodes()[1]]), [myGraph.links()[0]]);
    test.deepEqual(myGraph.getContainLinks([myGraph.nodes()[1], myGraph.nodes()[2]]), [myGraph.links()[2], myGraph.links()[1]]);
    test.deepEqual(myGraph.getContainLinks([myGraph.nodes()[1], myGraph.nodes()[2], myGraph.nodes()[3]]), [myGraph.links()[3], myGraph.links()[2], myGraph.links()[1]]);
    
    test.end();
});

//TODO test getRelatedLinks