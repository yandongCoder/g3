var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3"),
    d3 = require("d3");


tape("translate graph to specified x, y", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    global.window = document.defaultView;

    global.SVGElement = function SVGElement() {};//TODO Jsdom not has SVGElement implement yet, this sentence just void test error

    var myGraph = g3.graph(svg, {autoRender: true}).render();

    test.deepEqual(d3.zoomTransform(svg), {k:1, x: 0, y: 0});

    // if not has duration, translate will applied immediately
    myGraph.translateBy(200, -200);
    test.deepEqual(d3.zoomTransform(svg), {k:1, x: 200, y: -200});

    // if has duration, translate will not applied immediately
    myGraph.translateBy(100, -100, 100);
    test.notDeepEqual(d3.zoomTransform(svg), {k:1, x: 100, y: -100});


    test.end();
});