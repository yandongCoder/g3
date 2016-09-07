var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");
    d3 = require("d3");


tape("nodes DOM should correspond _nodes always", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    global.window = document.defaultView;

    var myGraph = g3.graph(svg);

    var nodes = [{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}];
    myGraph.nodes(nodes);

    test.equal(myGraph.nodes().length, document.querySelector('.nodes').querySelectorAll('.node').length);

    //by Id
    myGraph.removeNodes(1);
    test.equal(myGraph.nodes().length, document.querySelector('.nodes').querySelectorAll('.node').length);

    //by Node
    myGraph.removeNodes(nodes[1]);
    test.equal(myGraph.nodes().length, document.querySelector('.nodes').querySelectorAll('.node').length);

    //by Id array
    myGraph.removeNodes([3]);
    test.equal(myGraph.nodes().length, document.querySelector('.nodes').querySelectorAll('.node').length);

    //by Id obj
    myGraph.removeNodes({id: 4});
    test.equal(myGraph.nodes().length, document.querySelector('.nodes').querySelectorAll('.node').length);

    //by Id obj Array
    myGraph.removeNodes({id: 5});
    test.equal(myGraph.nodes().length, document.querySelector('.nodes').querySelectorAll('.node').length);
    test.end();
});