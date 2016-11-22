var tape = require("tape"),
    g3 = require("../../dist/js/g3");

//flattenGroup method
tape("If Group Nodes and one of them grouped before (meaning has groupedBy), flattenGroup will ungroup that first, then group them again.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}])
        .links({id:1, src: 1, dst: 2}, {id:2, src: 2, dst: 3}, {id:3, src: 3, dst: 4});
    
    myGraph.group([myGraph.nodes()[0], myGraph.nodes()[1]]);
    myGraph.group([myGraph.nodes()[4], myGraph.nodes()[2]]);
    
    myGraph.flattenGroup([myGraph.nodes()[5], myGraph.nodes()[3]]);
    
    test.deepEqual(myGraph.nodes()[4].groupedBy.nodes, myGraph.getNodes([1,2,3,4]));
    test.deepEqual(myGraph.nodes()[4].groupedBy.links, myGraph.getLinks([1,2]));
    test.end();
    
});

//groupBy method
tape("Group Nodes by Node's property", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, type: 1}, {id: 2, type: 2}, {id: 3, type: 3}, {id: 4, type: 1}, {id: 5, type: 2}])
        .links([{id:1, src: 1, dst: 4}, {id:2, src: 1, dst: 5}, {id:3, src: 2, dst: 3}, {id:4, src: 2, dst: 5}, {id:5, src: 3, dst: 4}]);
    
    myGraph.groupBy(myGraph.nodes(), 'type');
    
    test.equal(myGraph.getRenderedLinks().length, 3);
    test.equal(myGraph.getRenderedNodes().length, 3);
    test.equal(myGraph.getNodes("grouped:1&4").length, 1);
    test.equal(myGraph.getNodes("grouped:2&5").length, 1);
    
    test.end();
});

tape("Group Nodes by Related Nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 3}, {id:3, src: 2, dst: 4}, {id:4, src: 3, dst: 4}, {id:5, src: 4, dst: 5}, {id:6, src: 4, dst: 6}]);
    
    myGraph.groupBy(null, function(Node){
        var groupIds = [];
        Node.getConnectedLinks().forEach(function(Link){
            if(Link.source === Node) groupIds.push(Link.target.id);
            else groupIds.push(Link.source.id);
        });
        groupIds = _.sortBy(groupIds, function (val) {return val;});
        
        return groupIds;
    });
    
    test.equal(myGraph.getRenderedNodes().length, 4);
    test.equal(myGraph.getNodes("grouped:2&3").length, 1);
    test.equal(myGraph.getNodes("grouped:5&6").length, 1);
    test.equal(myGraph.getRenderedLinks().length, 6);
    
    test.end();
});

//group method
tape("Group two Nodes which contain a Link, attach no Links", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 2, dst: 3}]);

    myGraph.group([myGraph.nodes()[0], myGraph.nodes()[1]]);
    myGraph.group([myGraph.nodes()[0], myGraph.nodes()[1]]);//幂等性

    test.equal(myGraph.getRenderedNodes().length, 2);

    test.equal(myGraph.nodes()[0].attr("grouped"), true);
    test.equal(myGraph.nodes()[1].attr("grouped"), true);
    test.deepEqual(myGraph.nodes()[3].groupedBy.nodes, [myGraph.nodes()[0], myGraph.nodes()[1]]);
    test.deepEqual(myGraph.nodes()[3].groupedBy.links, [myGraph.links()[0]]);
    test.deepEqual(myGraph.nodes()[3].groupedBy.attachedLinks, [{"link": myGraph.links()[1], "originalSource": myGraph.nodes()[1]}]);

    test.deepEqual(myGraph.links()[1].source, myGraph.nodes()[3]);

    test.end();
});

tape("A Node could only grouped once.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 2, dst: 3}]);

    myGraph.group([myGraph.nodes()[0], myGraph.nodes()[1]]);
    myGraph.group([myGraph.nodes()[1], myGraph.nodes()[2]]);

    test.equal(myGraph.nodes().length, 4);
    test.equal(myGraph.getRenderedNodes().length, 2);

    test.equal(myGraph.nodes()[0].attr("grouped"), true);
    test.equal(myGraph.nodes()[1].attr("grouped"), true);
    test.deepEqual(myGraph.nodes()[3].groupedBy.nodes, [myGraph.nodes()[0], myGraph.nodes()[1]]);
    test.deepEqual(myGraph.nodes()[3].groupedBy.links, [myGraph.links()[0]]);

    test.end();
});

tape("Can't group only one node.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes({id: 1});

    myGraph.group(myGraph.nodes());

    test.equal(myGraph.nodes().length, 1);

    test.end();
});