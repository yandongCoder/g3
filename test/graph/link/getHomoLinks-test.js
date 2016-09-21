var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("Return all Links that connected same source and target as received Link", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 2, dst: 1}, {id:3, src: 1, dst: 4}]);
    
    test.deepEqual(myGraph.links()[0].getHomoLinks(), [myGraph.links()[0], myGraph.links()[1]]);
    test.deepEqual(myGraph.links()[1].getHomoLinks(), [myGraph.links()[0], myGraph.links()[1]]);
    test.deepEqual(myGraph.links()[2].getHomoLinks(), [myGraph.links()[2]]);

    test.end();
});