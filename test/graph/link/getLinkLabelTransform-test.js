var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("Transform label, make label text always upward", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    //horizontal
    var myGraph = g3.graph(svg)
        .nodes([{id: 1, x: 0, y: 0, radius: 30}, {id: 2, x: 100, y: 0, radius: 20}])
        .links([{id: 1, src: 1, dst: 2, direction: 1}, {id: 2, src: 2, dst: 1, direction: 1}]);


    test.deepEqual(myGraph.links()[0].getLinkLabelTransform(2), 'translate(50.5 0) scale(0.5) translate(-50.5 0)');
    test.deepEqual(myGraph.links()[1].getLinkLabelTransform(2), 'rotate(180 59.5 0) translate(59.5 0) scale(0.5) translate(-59.5 0)');




    test.end();
});
