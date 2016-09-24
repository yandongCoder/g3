var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");

tape("direction 0 + direction N = N", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2, direction: 0}, {id: 2, src: 2, dst: 1, direction: 2}]);

    test.equal(g3.utils.direction(myGraph.links()), 2);

    test.end();
});

tape("direction 1 + direction 2 = 3", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2, direction: 1}, {id: 2, src: 2, dst: 1, direction: 2}]);

    test.equal(g3.utils.direction(myGraph.links()), 3);

    test.end();
});

tape("direction 3 + direction N = 3", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2, direction: 3}, {id: 2, src: 2, dst: 1, direction: 0}]);

    test.equal(g3.utils.direction(myGraph.links()), 3);

    test.end();
});

tape("direction N + direction N = N", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2, direction: 2}, {id: 2, src: 2, dst: 1, direction: 2}]);

    test.equal(g3.utils.direction(myGraph.links()), 2);

    test.end();
});