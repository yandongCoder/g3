var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("select a Node", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");


    var myGraph = g3.graph(svg)
        .nodes([{id: 1, x: 0, y: 0, selected: true}, {id: 2, x: 100, y: 0}]);



    test.equal(myGraph.nodes()[0].selected(), true);
    test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].className, "node selected");
    test.equal(myGraph.nodes()[1].selected(), false);
    test.equal(document.querySelector(".nodes").querySelectorAll(".node")[1].className, "node");

    myGraph.nodes()[0].selected(true);
    test.equal(myGraph.nodes()[0].selected(), true);
    test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].className, "node selected");


    test.end();
});
