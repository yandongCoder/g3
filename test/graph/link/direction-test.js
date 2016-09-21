var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("get and set direction of a Link", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");


    var myGraph = g3.graph(svg)
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}])
        .links([{id: 1, src: 1, dst: 2}]);


    test.equal(myGraph.links()[0].direction(), 1);
    test.equal(document.querySelector(".paths").querySelectorAll(".link-path")[0].style.markerStart, "");
    test.notEqual(document.querySelector(".paths").querySelectorAll(".link-path")[0].style.markerEnd, "");

    myGraph.links()[0].direction(2);
    test.equal(myGraph.links()[0].direction(), 2);
    test.notEqual(document.querySelector(".paths").querySelectorAll(".link-path")[0].style.markerStart, "");
    test.equal(document.querySelector(".paths").querySelectorAll(".link-path")[0].style.markerEnd, "");

    myGraph.links()[0].direction(3);
    test.equal(myGraph.links()[0].direction(), 3);
    test.notEqual(document.querySelector(".paths").querySelectorAll(".link-path")[0].style.markerStart, "");
    test.notEqual(document.querySelector(".paths").querySelectorAll(".link-path")[0].style.markerEnd, "");

    myGraph.links()[0].direction(0);
    test.equal(myGraph.links()[0].direction(), 0);
    test.equal(document.querySelector(".paths").querySelectorAll(".link-path")[0].style.markerStart, "");
    test.equal(document.querySelector(".paths").querySelectorAll(".link-path")[0].style.markerEnd, "");

    test.end();
});
