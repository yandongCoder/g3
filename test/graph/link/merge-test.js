var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("Merge all Links between same two Nodes", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    myGraph.links()[0].merge();
    test.equal(myGraph.links().length, 5);
    test.equal(myGraph.getRenderedLinks().length, 2);
    test.deepEqual(myGraph.links()[4].mergedBy, [myGraph.links()[0], myGraph.links()[1], myGraph.links()[2]]);
    test.end();

});
