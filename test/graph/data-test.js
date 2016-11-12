var tape = require("tape"),
    g3 = require("../../dist/js/g3");

global.d3 = require("d3");
global._ = require('underscore');
global.SVGElement = function SVGElement() {};//TODO Jsdom not has SVGElement implement yet, this sentence just void test error

//clearNodes method
tape("Clear all Nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false});
    
    myGraph.nodes([{id: 1, label: "A", x: 50, y: 50}, {id: 2, label: "A", x: 100, y: 100},{id: 2, label: "A", x: 130, y: 130}]);
    test.equal(myGraph.nodes().length, 2);
    myGraph.clearNodes();
    test.equal(myGraph.nodes().length, 0);
    
    test.end();
});

//clearLinks method
tape("Clear all Links", function(test){
    var myGraph = g3.graph(null, {ifRender: false});
    
    myGraph.nodes([{id: 1, label: "A", x: 50, y: 50}, {id: 2, label: "A", x: 100, y: 100},{id: 3, label: "A", x: 130, y: 130}]);
    myGraph.links([{id: 1, label: "A->B", src: 1, dst: 2,direction: 0},{id: 2, label: "C->D", src: 3, dst: 2,direction: 3}]);
    
    test.equal(myGraph.links().length, 2);
    myGraph.clearLinks();
    test.equal(myGraph.links().length, 0);
    
    test.end();
});

//hasNode method
tape("Don't add node if node's id repeated in graph's _nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false});
    
    var nodes = [{id: 1, label: "A", x: 50, y: 50}, {id: 2, label: "A", x: 100, y: 100},{id: 2, label: "A", x: 130, y: 130}];
    myGraph.nodes(nodes);
    test.equal(myGraph.nodes().length, 2);
    
    //only compare ID
    test.equal(myGraph.hasNode({id: 1, label: "A", x: 50, y: 50}), true);
    test.equal(myGraph.hasNode({id: 1, label: "X", x: 1220, y: 12350}), true);
    test.equal(myGraph.hasNode(nodes[1]), true);
    test.equal(myGraph.hasNode({id: 99, label: "A", x: 50, y: 50}), false);
    test.end();
});

//hasLink method
tape("Don't add link if link's id repeated in graph's _links", function(test){
    var myGraph = g3.graph(null, {ifRender: false});
    
    var nodes = [{id: 1, label: "A", x: 50, y: 50}, {id: 2, label: "A", x: 100, y: 100},{id: 3, label: "A", x: 130, y: 130}];
    myGraph.nodes(nodes);
    var links = [{id: 1, label: "A->B", src: 1, dst: 2,direction: 0},{id: 2, label: "C->D", src: 3, dst: 4,direction: 3},{id: 3, label: "E->F", src: 5, dst: 6, direction: 3}];
    myGraph.links(links);
    test.equal(myGraph.links().length, 1);
    
    //only compare ID
    test.equal(myGraph.hasLink({id: 1, label: "A->B", src: 1, dst: 2,direction: 0}), true);
    test.equal(myGraph.hasLink({id: 2, label: "A->B", src: 1, dst: 2,direction: 0}), false);
    test.equal(myGraph.hasLink(links[1]), false);
    test.equal(myGraph.hasLink({id: 5, label: "A->B", src: 1, dst: 2,direction: 0}), false);
    test.end();
});

//addNode method
tape("Push new node to graph's nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false});
    
    //last could not add
    myGraph.nodes([{id: 1, label: "A", x: 50, y: 50}, {id: 2, label: "A", x: 100, y: 100},{id: 2, label: "A", x: 130, y: 130}]);
    test.equal(myGraph.nodes().length, 2);
    
    //could not add
    myGraph._addNode({id: 2, label: "X", x: 100, y: 120});
    test.equal(myGraph.nodes().length, 2);
    
    //could add
    myGraph._addNode({id: 3, label: "X", x: 100, y: 120});
    test.equal(myGraph.nodes().length, 3);
    
    test.end();
});

//addLink method
tape("Push new link to graph's links", function(test){
    var myGraph = g3.graph(null, {ifRender: false});
    
    //last could not add
    myGraph.nodes([{id: 1}, {id: 2}])
        .links({id: 1, src: 1, dst: 2});
    test.equal(myGraph.links().length, 1);
    
    //could not add
    myGraph._addLink({id: 1, src: 1, dst: 2});
    test.equal(myGraph.links().length, 1);
    
    //could add
    myGraph._addLink({id: 2, src: 1, dst: 2});
    test.equal(myGraph.links().length, 2);
    
    test.end();
});

//removeNodes method
tape("Remove node by filter", function(test){
    var myGraph = g3.graph(null, {ifRender: false});
    
    var nodes = [{id: 1}];
    myGraph.nodes(nodes);

    myGraph.removeNodes(1);
    test.equal(myGraph.nodes().length, 0);
    test.end();
    
});

//removeLinks method
tape("Remove Link by filter", function(test){
    var myGraph = g3.graph(null, {ifRender: false});
    
    myGraph.nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2}]);
    
    myGraph.removeLinks(1);
    test.equal(myGraph.links().length, 0);
    test.end();

});

//removeLinksOfNode method
tape("Remove Links of a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false});
    
    myGraph.nodes([{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}]);
    var links = [{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 1, dst: 5}, {id: 4, src: 5, dst: 6}, {id: 5, src: 5, dst: 4}];
    myGraph.links(links);
    
    test.equal(myGraph.links().length, 5);
    myGraph.removeNodes(1);
    test.equal(myGraph.links().length, 3);
    test.equal(myGraph.getLinks([1, 3]).length, 0);
    
    test.end();
    
});

//nodes method
tape("Add nodes to graph", function(test){
    var myGraph = g3.graph(null, {ifRender: false});

    //last could not add
    myGraph.nodes([{id: 1, label: "A", x: 50, y: 50}, {id: 2, label: "A", x: 100, y: 100},{id: 2, label: "A", x: 130, y: 130}]);
    test.equal(myGraph.nodes().length, 2);


    //could not add
    myGraph.nodes({id: 2, label: "X", x: 100, y: 120});
    test.equal(myGraph.nodes().length, 2);

    //could add
    myGraph.nodes({id: 3, label: "X", x: 100, y: 120});
    test.equal(myGraph.nodes().length, 3);


    //could add
    myGraph.nodes({label: "X", x: 100, y: 120});
    test.equal(myGraph.nodes().length, 4);
    //could not add
    myGraph.nodes({label: "X", x: 100, y: 120});
    test.equal(myGraph.nodes().length, 4);
    
    test.end();
});

tape("Push new nodes and cover graph's current nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false});

    //add
    myGraph.nodes([{id: 1, label: "A", x: 50, y: 50}, {id: 2, label: "A", x: 100, y: 100},{id: 3, label: "A", x: 130, y: 130}]);
    test.equal(myGraph.nodes().length, 3);


    //cover
    myGraph.nodes({id: 4, label: "X", x: 100, y: 120}, true);
    test.equal(myGraph.nodes().length, 1);


    test.end();
});

tape("Add a grouped Node to graph", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, grouped: true}, {id: 2, grouped: true},{id: 3}, {id: 4, groupedBy:{nodes: [1, 2], links:[1], attachedLinks: [2]}}])
        .links([{id:1, src: 1, dst: 2, grouped: true}, {id:2, src: 2, dst: 3}]);
    
    test.deepEqual(myGraph.getRenderedNodes(), myGraph.getNodes([3, 4]));
    test.deepEqual(myGraph.getRenderedLinks(), myGraph.getLinks([2]));
    
    myGraph.nodes()[3].ungroup();
    test.deepEqual(myGraph.getRenderedNodes(), myGraph.getNodes([1, 2, 3]));
    test.deepEqual(myGraph.getRenderedLinks(), myGraph.getLinks([1, 2]));
    
    test.end();
});

//links method
tape("Could not add link which not has source or target in nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false});
    
    myGraph.links([{id: 1, label: "A->B", src: 1, dst: 2,direction: 0},{id: 2, label: "C->D", src: 3, dst: 4,direction: 3}]);
    test.equal(myGraph.links().length, 0);
    test.end();
});

tape("Add link to graph", function(test){
    var myGraph = g3.graph(null, {ifRender: false});
    
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
