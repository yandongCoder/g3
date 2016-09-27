var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");

tape("Group two Nodes which contain a Link, attach no Links", function(test){
    console.time("abc");
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    console.timeEnd("abc");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 2, dst: 3}]);

    myGraph.group([myGraph.nodes()[0], myGraph.nodes()[1]]);

    test.equal(myGraph.getRenderedNodes().length, 3);

    test.equal(myGraph.nodes()[0].grouped(), true);
    test.equal(myGraph.nodes()[1].grouped(), true);
    test.deepEqual(myGraph.nodes()[3].groupedBy.nodes, [myGraph.nodes()[0], myGraph.nodes()[1]]);
    test.deepEqual(myGraph.nodes()[3].groupedBy.links, [myGraph.links()[0]]);

    test.deepEqual(myGraph.links()[1].source, myGraph.nodes()[3]);
    console.timeEnd('abc');
    test.end();

});