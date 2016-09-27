var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("get and set width of a Link", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");


    var myGraph = g3.graph(svg, {autoRender: true})
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}])
        .links([{id: 1, src: 1, dst: 2}, {id: 2, src: 1, dst: 2, width: 9}, {id: 3, src: 1, dst: 2, width: 10}]);



    test.equal(myGraph.links()[0].width(), 3);
    test.equal(document.querySelector(".paths").querySelectorAll(".link-path")[0].style.strokeWidth, '3');
    test.equal(myGraph.links()[1].width(), 9);
    test.equal(document.querySelector(".paths").querySelectorAll(".link-path")[1].style.strokeWidth, '9');
    test.equal(myGraph.links()[2].width(), 10);
    test.equal(document.querySelector(".paths").querySelectorAll(".link-path")[2].style.strokeWidth, '10');

    myGraph.links()[0].width(7);
    test.equal(myGraph.links()[0].width(), 7);
    test.equal(document.querySelector(".paths").querySelectorAll(".link-path")[0].style.strokeWidth, '7');


    


    test.end();
});
