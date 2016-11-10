var tape = require("tape"),
g3 = require("../../dist/js/g3");

tape("Add link to graph", function(test){
    var myGraph = g3.graph(null, {ifRender: false});

    //could not add link which not has source or target in nodes
    myGraph.links([{id: 1, label: "A->B", src: 1, dst: 2,direction: 0},{id: 2, label: "C->D", src: 3, dst: 4,direction: 3}]);
    test.equal(myGraph.links().length, 0);


    myGraph.nodes([{id: 1, label: "A", x: 50, y: 50}, {id: 2, label: "A", x: 100, y: 100},{id: 2, label: "A", x: 130, y: 130}]);


    myGraph.links([{id: 1, label: "A->B", src: 1, dst: 2,direction: 0},{id: 2, label: "C->D", src: 3, dst: 4,direction: 3}]);
    test.equal(myGraph.links().length, 1);


    myGraph.nodes([{id: 3, label: "A", x: 50, y: 50}, {id: 4, label: "A", x: 100, y: 100}]);

    //could add link which has source and target in nodes
    myGraph.links({id: 3, label: "A->B", src: 3, dst: 4,direction: 0});
    test.equal(myGraph.links().length, 2);

    //could not add link which id has been in links
    myGraph.links({id: 3, label: "A->B", src: 2, dst: 4,direction: 0});
    test.equal(myGraph.links().length, 2);

    test.end();
});

tape('Add merged Link to graph', function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id:1, src: 1, dst: 2, merged: true}, {id:2, src: 1, dst: 2, merged: true}, {id: 3, src: 1, dst: 2, mergedBy: {links: [1,2]}}]);
    
    test.deepEqual(myGraph.getRenderedLinks(), myGraph.getLinks([3]));
    
    myGraph.getLinks(3)[0].unmerge();
    
    test.deepEqual(myGraph.getRenderedLinks(), myGraph.getLinks([1,2]));
    
    
    test.end();
});

tape('Add transformed Link to graph', function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, transformed: true}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2, transformed: true}, {id: 2, src: 1, dst: 3, transformed: true}, {id: 3, src: 2, dst: 3, transformedBy: {node: 1, links: [1, 2]}}]);
    
    test.deepEqual(myGraph.getRenderedLinks(), myGraph.getLinks(3));
    
    myGraph.getLinks(3)[0].LtoN();
    
    test.deepEqual(myGraph.getRenderedLinks(), myGraph.getLinks([1,2]));
    
    
    test.end();
});