var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("A graph call init only once in first render", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    myGraph = g3.graph(svg);
    myGraph._render();
    myGraph._render();

    test.equal(svg.querySelectorAll("defs").length, 1);
    test.equal(svg.querySelectorAll("g.brush").length, 1);
    test.equal(svg.querySelectorAll("g.force").length, 1);
    test.end();
});

tape("Deselect all Nodes and Links when click canvas itself.", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1, selected: true}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2, selected: true}]);
    
    myGraph.render();
    var event = new window.MouseEvent("mousedown");
    document.querySelector('svg').dispatchEvent(event);
    
    test.equal(myGraph.nodes()[0].attr("selected"), false);
    test.equal(myGraph.links()[0].attr("selected"), false);
    
    test.end();
});