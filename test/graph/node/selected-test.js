var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("select a Node", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1, x: 0, y: 0, selected: true}, {id: 2, x: 100, y: 0}]);

    test.equal(myGraph.nodes()[0].selected(), true);
    test.equal(myGraph.nodes()[1].selected(), false);

    myGraph.nodes()[1].selected(true);
    test.equal(myGraph.nodes()[1].selected(), true);

    myGraph.nodes()[0].selected(false);
    test.equal(myGraph.nodes()[0].selected(), false);

    test.end();
});

tape("select a Node when mousedown", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg, {autoRender: true});

    var nodes = [{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}];
    myGraph.nodes(nodes);

    var event = new window.Event("mousedown");
    document.querySelector('.node').dispatchEvent(event);

    test.equal(myGraph.nodes()[0].selected(), true);


    test.end();
});
