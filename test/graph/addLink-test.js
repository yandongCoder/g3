var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");

tape("Push new link to graph's links", function(test){
    var document = jsdom.jsdom('<canvas id="graph"></canvas>');
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