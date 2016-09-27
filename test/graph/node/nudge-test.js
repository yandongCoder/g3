var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("Nudge a Node", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");


    var myGraph = g3.graph(svg, {autoRender: true})
        .nodes([{id: 1, x: 5, y: 0}, {id: 2, x: 100, y: 0}]);



    test.equal(myGraph.nodes()[0].getX(), 5);
    test.equal(myGraph.nodes()[0].getY(), 0);
    test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].getAttribute('transform'), 'translate(5,0)');
    test.equal(myGraph.nodes()[1].getX(), 100);
    test.equal(myGraph.nodes()[1].getY(), 0);
    test.equal(document.querySelector(".nodes").querySelectorAll(".node")[1].getAttribute('transform'), 'translate(100,0)');

    myGraph.nodes()[0].nudge(10, 10);
    test.equal(myGraph.nodes()[0].getX(), 15);
    test.equal(myGraph.nodes()[0].getY(), 10);
    test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].getAttribute("transform"), 'translate(15,10)');


    test.end();
});
