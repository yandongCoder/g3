var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");

tape("scale graph to specified k", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    global.window = document.defaultView;

    global.SVGElement = function SVGElement() {};//TODO Jsdom not has SVGElement implement yet, this sentence just void test error
    
    var myGraph = g3.graph(svg).render();

    test.equal(d3.zoomTransform(svg).k, 1);

    // if not has duration, scale will applied immediately
    myGraph.scaleTo(1.8);
    test.equal(d3.zoomTransform(svg).k, 1.8);

    // if has duration, scale will not applied immediately
    myGraph.scaleTo(0.4, 100);
    test.notEqual(d3.zoomTransform(svg).k, 0.4);

    test.end();
});