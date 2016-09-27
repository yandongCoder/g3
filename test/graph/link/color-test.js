var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("get and set color of a Link", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");


    var myGraph = g3.graph(svg, {autoRender: true})
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}])
        .links([{id: 1, src: 1, dst: 2, color: "red"}, {id: 2, src: 2, dst: 1}]);


    test.equal(myGraph.links()[0].color(), "red");
    test.equal(document.querySelector(".paths").querySelectorAll(".link-path")[0].style.stroke, "red");
    test.equal(myGraph.links()[1].color(), "#a1a1a1");
    test.equal(document.querySelector(".paths").querySelectorAll(".link-path")[1].style.stroke, "#a1a1a1");

    myGraph.links()[0].color('#666888');
    test.equal(myGraph.links()[0].color(), "#666888");
    test.equal(document.querySelector(".paths").querySelectorAll(".link-path")[0].style.stroke, "#666888");
    
    test.end();
});
