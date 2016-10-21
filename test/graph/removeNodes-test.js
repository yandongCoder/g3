var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("remove node by Node or NodeId", function(test){
    var myGraph = g3.graph(null, {ifRender: false});


    var nodes = [{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}];
    myGraph.nodes(nodes);
    
    test.equal(myGraph.nodes().length, 6);
    //by Id
    myGraph.removeNodes(1);
    test.equal(myGraph.nodes().length, 5);
    test.equal(getNodeLenById(1), 0);

    //by Node
    myGraph.removeNodes(nodes[1]);
    test.equal(myGraph.nodes().length, 4);
    test.equal(getNodeLenById(2), 0);

    //by Id array
    myGraph.removeNodes([3]);
    test.equal(myGraph.nodes().length, 3);
    test.equal(getNodeLenById(3), 0);

    //by Id obj
    myGraph.removeNodes({id: 4});
    test.equal(myGraph.nodes().length, 2);
    test.equal(getNodeLenById(4), 0);

    //by Id obj Array
    myGraph.removeNodes({id: 5});
    test.equal(myGraph.nodes().length, 1);
    test.equal(getNodeLenById(5), 0);
    test.end();

    function getNodeLenById (id){
        return myGraph.nodes().filter(function(Node){ return Node.id === id }).length;
    }
});