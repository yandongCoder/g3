var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("Judge whether a Link has been merged", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    test.equal(myGraph.links()[0]._hasBeenMerged(), false);
    test.equal(myGraph.links()[1]._hasBeenMerged(), false);
    test.equal(myGraph.links()[2]._hasBeenMerged(), false);
    test.equal(myGraph.links()[3]._hasBeenMerged(), false);

    myGraph.links()[0].merge();

    test.equal(myGraph.links()[0]._hasBeenMerged(), true);
    test.equal(myGraph.links()[1]._hasBeenMerged(), true);
    test.equal(myGraph.links()[2]._hasBeenMerged(), true);
    test.equal(myGraph.links()[3]._hasBeenMerged(), false);
    test.equal(myGraph.links()[4]._hasBeenMerged(), false);


    test.end();

});