var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");

tape("remove node by Node or NodeId", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg);


    var nodes = [{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}];
    myGraph.nodes(nodes);
    
    test.equal(myGraph.nodes().length, 6);
    //by Id
    myGraph.removeNodes(1);
    test.equal(myGraph.nodes().length, 5);

    //by Node
    myGraph.removeNodes(nodes[1]);
    test.equal(myGraph.nodes().length, 4);

    //by Id array
    myGraph.removeNodes([3]);
    test.equal(myGraph.nodes().length, 3);

    //by Id obj
    myGraph.removeNodes({id: 4});
    test.equal(myGraph.nodes().length, 2);

    //by Id obj Array
    myGraph.removeNodes({id: 5});
    test.equal(myGraph.nodes().length, 1);
    test.end();
});