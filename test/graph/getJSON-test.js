var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");

tape("Get json string of a Graph.", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    
    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2}]);
    
    myGraph.transform(2, 200, -200);
    
    test.deepEqual(myGraph.getJSON(), { links: [ { color: '#a1a1a1', direction: 1, dst: 2, id: 1, label: '', src: 1, width: 3 } ], nodes: [ { color: '#123456', id: 1, label: '', radius: 15, selected: false, x: 0, y: 0 }, { color: '#123456', id: 2, label: '', radius: 15, selected: false, x: 0, y: 0 } ], scale: 2, translate: [ 400, -400 ] });
    
    test.end();
});