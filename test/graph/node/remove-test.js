var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("remove a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false});


    var nodes = [{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}];
    myGraph.nodes(nodes);

    test.equal(myGraph.nodes().length, 6);

    //by Node
    myGraph.nodes()[0].remove();
    test.equal(myGraph.nodes().length, 5);
    test.equal(getNodeLenById(1), 0);

    test.end();

    function getNodeLenById (id){
        return myGraph.nodes().filter(function(Node){ return Node.id === id }).length;
    }
});

tape("remove a grouped Node will remove all referenced Nodes and Links in groupedBy", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 2, dst: 3}]);
    
    myGraph.group([myGraph.nodes()[0], myGraph.nodes()[1]]);
    
    myGraph.nodes()[3].remove();
    
    test.equal(myGraph.nodes().length, 1);
    test.equal(myGraph.links().length, 0);
    
    test.end();
});