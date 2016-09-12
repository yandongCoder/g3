var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");

tape("get nodes by id filter", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg);


    var nodes = [{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}];
    myGraph.nodes(nodes);

    test.equal(myGraph.nodes().length, 6);
    //by Id
    test.deepEqual(myGraph.getNodes(1), [myGraph.nodes()[0]]);

    //by Node
    test.deepEqual(myGraph.getNodes(myGraph.nodes()[3]), [myGraph.nodes()[3]]);

    //by Id array
    test.deepEqual(myGraph.getNodes([4, 5]), [myGraph.nodes()[3], myGraph.nodes()[4]]);


    //by Id obj
    test.deepEqual(myGraph.getNodes({id: 6}), [myGraph.nodes()[5]]);

    //by Id obj Array
    test.deepEqual(myGraph.getNodes([{id: 5}, {id: 6}]), [myGraph.nodes()[4], myGraph.nodes()[5]]);
    test.end();
    
});