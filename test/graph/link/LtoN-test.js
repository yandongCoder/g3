var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("Transform Link to Node according to transformedBy", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id: 2, src: 1, dst: 3}]);

    myGraph.nodes()[0].NtoL();
    test.equal(myGraph.getRenderedNodes().length, 2);
    test.equal(myGraph.links().length, 3);
    test.equal(myGraph.getRenderedLinks().length, 1);

    myGraph.links()[2].LtoN();
    test.equal(myGraph.getRenderedNodes().length, 3);
    test.equal(myGraph.nodes()[0].transformed(), false);

    test.equal(myGraph.links().length, 2);
    test.equal(myGraph.getRenderedLinks().length, 2);
    test.equal(myGraph.links()[0].transformed(), false);
    test.equal(myGraph.links()[1].transformed(), false);

    test.end();

});