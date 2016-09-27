var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3"),
    d3 = require("d3");


tape("Don't render if autoRender is false", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg);

    var nodes = [{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}];
    myGraph.nodes(nodes);

    test.equal(document.querySelector('.nodes'), null);


    test.end();
});

tape("Auto render if autoRender is true", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg, {autoRender: true});

    var nodes = [{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}];
    myGraph.nodes(nodes);
    
    test.equal(myGraph.nodes().length, document.querySelector('.nodes').querySelectorAll('.node').length);


    test.end();
});