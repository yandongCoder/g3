var tape = require("tape"),
    g3 = require("../../dist/js/g3");

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
