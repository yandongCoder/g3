var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("get and set label of a Link", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");


    var myGraph = g3.graph(svg, {autoRender: true})
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}])
        .links([{id: 1, src: 1, dst: 2, label: "a"}, {id: 2, src: 1, dst: 2, label: "b"}, {id: 3, src: 1, dst: 2}]);



    test.equal(myGraph.links()[0].label(), "a");
    test.equal(document.querySelector(".link-labels").querySelectorAll(".link-label")[0].textContent, "a");
    test.equal(myGraph.links()[1].label(), "b");
    test.equal(document.querySelector(".link-labels").querySelectorAll(".link-label")[1].textContent, "b");
    test.equal(myGraph.links()[2].label(), "");
    test.equal(document.querySelector(".link-labels").querySelectorAll(".link-label")[2].textContent, "");

    myGraph.links()[0].label('abc');
    test.equal(myGraph.links()[0].label(), "abc");
    test.equal(document.querySelector(".link-labels").querySelectorAll(".link-label")[0].textContent, "abc");



    test.end();
});
