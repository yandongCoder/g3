var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("select a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0, selected: true}, {id: 2, x: 100, y: 0}]);

    myGraph.nodes()[0].selected(false);
    test.equal(myGraph.nodes()[0].selected(), false);
    myGraph.nodes()[1].selected(true);
    test.equal(myGraph.nodes()[1].selected(), true);

    test.end();
});

tape("Select a Node when mousedown, and unselect others", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg);

    var nodes = [{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}];
    myGraph.nodes(nodes);

    myGraph.render(function(){
        var event = new window.Event("mousedown");
        document.querySelectorAll('.node')[0].dispatchEvent(event);
        document.querySelectorAll('.node')[1].dispatchEvent(event);

        test.equal(myGraph.nodes()[0].selected(), false);
        test.equal(myGraph.nodes()[0].selected(), true);

        test.end();
    });
});
