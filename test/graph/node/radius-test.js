var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("get and set radius of a Node", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");


    var myGraph = g3.graph(svg, {autoRender: true})
        .nodes([{id: 1, x: 0, y: 0, radius: 30}, {id: 2, x: 100, y: 0}]);



    test.equal(myGraph.nodes()[0].radius(), 30);
    test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].querySelector("circle").getAttribute('r'), '30');
    test.equal(myGraph.nodes()[1].radius(), 15);
    test.equal(document.querySelector(".nodes").querySelectorAll(".node")[1].querySelector("circle").getAttribute('r'), '15');

    myGraph.nodes()[0].radius(40);
    test.equal(myGraph.nodes()[0].radius(), 40);
    test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].querySelector("circle").getAttribute('r'), '40');


    test.end();
});
