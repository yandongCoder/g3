var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("get and set color of a Node", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");


    var myGraph = g3.graph(svg, {autoRender: true})
        .nodes([{id: 1, x: 0, y: 0, color: "red"}, {id: 2, x: 100, y: 0}]);



    test.equal(myGraph.nodes()[0].color(), "red");
    test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].querySelector("circle").style.fill, "red");
    test.equal(myGraph.nodes()[1].color(), "#123456");
    test.equal(document.querySelector(".nodes").querySelectorAll(".node")[1].querySelector("circle").style.fill, "#123456");

    myGraph.nodes()[0].color('#666888');
    test.equal(myGraph.nodes()[0].color(), "#666888");
    test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].querySelector("circle").style.fill, "#666888");


    test.end();
});
