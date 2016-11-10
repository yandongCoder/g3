var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("Add a grouped Node to graph, should build groupedBy node and link Id array to Node and Link reference array", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, grouped: true}, {id: 2, grouped: true},{id: 3}, {id: 4, groupedBy:{nodes: [1, 2], links:[1], attachedLinks: [2]}}])
        .links([{id:1, src: 1, dst: 2, grouped: true}, {id:2, src: 2, dst: 3}]);
    
    test.deepEqual(myGraph.getNodes(4)[0].groupedBy.nodes, myGraph.getNodes([1, 2]));
    test.deepEqual(myGraph.getNodes(4)[0].groupedBy.links, myGraph.getLinks(1));
    test.deepEqual(myGraph.getNodes(4)[0].groupedBy.attachedLinks, [{link: myGraph.getLinks(2)[0], originalSource: myGraph.getNodes(2)[0]}]);
   
    test.end();
});

tape("Add a merged Link to graph, should build MergedBy Id array to Link reference array", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id:1, src: 1, dst: 2, merged: true}, {id:2, src: 1, dst: 2, merged: true}, {id: 3, src: 1, dst: 2, mergedBy: {links: [1,2]}}]);

    test.deepEqual(myGraph.getLinks(3)[0].mergedBy.links, myGraph.getLinks([1, 2]));
    
    test.end();
});

tape("Add a merged Link to graph, should build MergedBy Id array to Link reference array", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id:1, src: 1, dst: 2, merged: true}, {id:2, src: 1, dst: 2, merged: true}, {id: 3, src: 1, dst: 2, mergedBy: {links: [1,2]}}]);
    
    test.deepEqual(myGraph.getLinks(3)[0].mergedBy.links, myGraph.getLinks([1, 2]));
    
    test.end();
});

tape("Add a transformed Link to graph, should build transformedBy node and links Id array to Node and Link reference array", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, transformed: true}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2, transformed: true}, {id: 2, src: 1, dst: 3, transformed: true}, {id: 3, src: 2, dst: 3, transformedBy: {node: 1, links: [1, 2]}}]);
    
    test.deepEqual(myGraph.getLinks(3)[0].transformedBy.node, myGraph.getNodes(1)[0]);
    test.deepEqual(myGraph.getLinks(3)[0].transformedBy.links, myGraph.getLinks([1, 2]));
    
    test.end();
});