var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");

global.d3 = require("d3");
global._ = require('underscore');
global.SVGElement = function SVGElement() {};//TODO Jsdom not has SVGElement implement yet, this sentence just void test error

tape("Push new link to graph's links", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    global.window = document.defaultView;
    global.document = document;


    var myGraph = g3.graph(svg);

    //last could not add
    myGraph.nodes([{id: 1}, {id: 2}])
        .links({id: 1, src: 1, dst: 2});
    test.equal(myGraph.links().length, 1);


    //could not add
    myGraph._addLink({id: 1, src: 1, dst: 2});
    test.equal(myGraph.links().length, 1);


    //could add
    myGraph._addLink({id: 2, src: 1, dst: 2});
    test.equal(myGraph.links().length, 2);

    test.end();
});