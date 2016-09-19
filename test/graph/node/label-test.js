var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("get and set label of a Node", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");


    var myGraph = g3.graph(svg)
        .nodes([{id: 1, x: 0, y: 0, label: "a"}, {id: 2, x: 100, y: 0}]);



    test.equal(myGraph.nodes()[0].label(), "a");
    test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].querySelector(".text-group").querySelector('span').textContent, "a");
    test.equal(myGraph.nodes()[1].label(), "");
    test.equal(document.querySelector(".nodes").querySelectorAll(".node")[1].querySelector(".text-group").querySelector('span').textContent, "");

    myGraph.nodes()[0].label('abc');
    test.equal(myGraph.nodes()[0].label(), "abc");
    test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].querySelector(".text-group").querySelector('span').textContent, "abc");

    
    test.end();
});
