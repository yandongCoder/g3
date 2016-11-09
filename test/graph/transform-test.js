var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");


tape("transform graph to specified k, x, y", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    global.window = document.defaultView;

    var myGraph = g3.graph(svg).render();

    test.deepEqual(d3.zoomTransform(svg), {k:1, x: 0, y: 0});

    // if not has duration, translate will applied immediately
    myGraph.transform(2, 200, -200);
    test.deepEqual(d3.zoomTransform(svg), {k:2, x: 400, y: -400});

    // if has duration, translate will not applied immediately
    myGraph.transform(1, 100, -100, 100);
    test.notDeepEqual(d3.zoomTransform(svg), {k:1, x: 100, y: -100});


    test.end();
});