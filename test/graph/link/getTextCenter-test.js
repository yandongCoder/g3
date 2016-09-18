var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("get Link's text center correctly", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    //horizontal
    var myGraph = g3.graph(svg)
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}])
        .links([{id: 1, src: 1, dst: 2, direction: 0, label: "a"}, {id: 2, src: 1, dst: 2, direction: 1, label: "a"}, {id: 3, src: 1, dst: 2, direction: 2, label: "a"}, {id: 4, src: 1, dst: 2, direction: 3, label: "a"}]);


    test.equal(myGraph.links()[0].getTextCenter(), 46.7);
    test.equal(myGraph.links()[1].getTextCenter(), 37.7);
    test.equal(myGraph.links()[2].getTextCenter(), 22.7);
    test.equal(myGraph.links()[3].getTextCenter(), 22.7);


    //vertical
    myGraph = g3.graph(svg)
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 0, y: 100}])
        .links([{id: 1, src: 1, dst: 2, direction: 0, label: "a"}, {id: 2, src: 1, dst: 2, direction: 1, label: "a"}, {id: 3, src: 1, dst: 2, direction: 2, label: "a"}, {id: 4, src: 1, dst: 2, direction: 3, label: "a"}]);


    test.equal(myGraph.links()[0].getTextCenter(), 46.7);
    test.equal(myGraph.links()[1].getTextCenter(), 37.7);
    test.equal(myGraph.links()[2].getTextCenter(), 22.7);
    test.equal(myGraph.links()[3].getTextCenter(), 22.7);


    test.end();
});
