var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("Judge Link's arrow point to right, only if Link is one-way arrow.", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    //horizontal
    var myGraph = g3.graph(svg)
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 40}])
        .links([{id: 1, src: 2, dst: 1, direction: 0}, {id: 2, src: 2, dst: 1, direction: 1}, {id: 3, src: 2, dst: 1, direction: 2}, {id: 4, src: 2, dst: 1, direction: 3}]);


    test.equal(myGraph.links()[0].arrowPointLeft(), false);
    test.equal(myGraph.links()[0].arrowPointRight(), false);

    test.equal(myGraph.links()[1].arrowPointLeft(), true);
    test.equal(myGraph.links()[1].arrowPointRight(), false);

    test.equal(myGraph.links()[2].arrowPointLeft(), false);
    test.equal(myGraph.links()[2].arrowPointRight(), true);

    test.equal(myGraph.links()[3].arrowPointLeft(), false);
    test.equal(myGraph.links()[3].arrowPointLeft(), false);

    //vertical
    myGraph = g3.graph(svg)
        .nodes([{id: 1, x: 0, y: -10}, {id: 2, x: 0, y: 100}])
        .links([{id: 1, src: 2, dst: 1, direction: 0}, {id: 2, src: 2, dst: 1, direction: 1}, {id: 3, src: 2, dst: 1, direction: 2}, {id: 4, src: 2, dst: 1, direction: 3}]);


    test.equal(myGraph.links()[0].arrowPointLeft(), false);
    test.equal(myGraph.links()[0].arrowPointRight(), false);

    test.equal(myGraph.links()[1].arrowPointLeft(), false);
    test.equal(myGraph.links()[1].arrowPointRight(), false);

    test.equal(myGraph.links()[2].arrowPointLeft(), false);
    test.equal(myGraph.links()[2].arrowPointRight(), false);

    test.equal(myGraph.links()[3].arrowPointLeft(), false);
    test.equal(myGraph.links()[3].arrowPointLeft(), false);
    test.end();

    test.end();
});
