var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");

//transform method
tape("Transform graph to specified k, x, y", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

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

//translateBy method
tape("Translate graph to specified x, y", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    
    var myGraph = g3.graph(svg).render();
    
    test.deepEqual(d3.zoomTransform(svg), {k:1, x: 0, y: 0});
    
    // if not has duration, translate will applied immediately
    myGraph.translateBy(200, -200);
    test.deepEqual(d3.zoomTransform(svg), {k:1, x: 200, y: -200});
    
    // if has duration, translate will not applied immediately
    myGraph.translateBy(100, -100, 100);
    test.notDeepEqual(d3.zoomTransform(svg), {k:1, x: 100, y: -100});
    
    
    test.end();
});

//scaleTo method
tape("Scale graph to specified k", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    
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