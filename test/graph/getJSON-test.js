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
    
    var firstLinkJson = { color: '#a1a1a1', direction: 1, dst: 2, id: 1, label: '', selected: false, src: 1, width: 3 },
        firstNodeJson = { color: '#123456', disabled: false, icon: '', id: 1, label: '', mugshot: '', radius: 15, selected: false, x: 0, y: 0 },
        secondNodeJson = { color: '#123456', disabled: false, icon: '', id: 2, label: '', mugshot: '', radius: 15, selected: false, x: 0, y: 0 };
    
    test.deepEqual(myGraph.getJSON([1],[]), {links: [], nodes: [firstNodeJson], scale: 2, translate: [ 400, -400 ] });
    test.deepEqual(myGraph.getJSON(), { links: [firstLinkJson], nodes: [firstNodeJson, secondNodeJson ], scale: 2, translate: [ 400, -400 ] });
    
    test.end();
});