var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("get and set _merge property of a Link", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");


    var myGraph = g3.graph(svg)
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}])
        .links([{id: 1, src: 1, dst: 2}, {id: 2, src: 1, dst: 2}]);

    test.equal(myGraph.links()[0].merged(), false);
    myGraph.links()[0].merged(true);
    test.equal(myGraph.links()[0].merged(), true);
    myGraph.links()[0].merged(false);
    test.equal(myGraph.links()[0].merged(), false);

    test.end();
});
