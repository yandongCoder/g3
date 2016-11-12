var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("A graph call init only once in first render", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    myGraph = g3.graph(svg);
    myGraph.render();
    myGraph.render();

    test.equal(svg.querySelectorAll("defs").length, 1);
    test.equal(svg.querySelectorAll("g.brush").length, 1);
    test.equal(svg.querySelectorAll("g.force").length, 1);
    test.end();
});

tape("Deselect all Nodes when click canvas itself.", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg);

    var nodes = [{id: 1, selected: true}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}];
    myGraph.nodes(nodes);

    myGraph.render(function(){
        test.equal(myGraph.nodes()[0].selected(), true);

        var event = new window.MouseEvent("click");
        document.querySelector('svg').dispatchEvent(event);

        test.equal(myGraph.nodes()[0].selected(), false);

        test.end();
    });
});