var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");

tape("Don't add link if link's id repeated in graph's _links", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg);

    var nodes = [{id: 1, label: "A", x: 50, y: 50}, {id: 2, label: "A", x: 100, y: 100},{id: 3, label: "A", x: 130, y: 130}];
    myGraph.nodes(nodes);
    var links = [{id: 1, label: "A->B", src: 1, dst: 2,direction: 0},{id: 2, label: "C->D", src: 3, dst: 4,direction: 3},{id: 3, label: "E->F", src: 5, dst: 6, direction: 3}];
    myGraph.links(links);
    test.equal(myGraph.links().length, 1);

    //only compare ID
    test.equal(myGraph.hasLink({id: 1, label: "A->B", src: 1, dst: 2,direction: 0}), true);
    test.equal(myGraph.hasLink({id: 2, label: "A->B", src: 1, dst: 2,direction: 0}), false);
    test.equal(myGraph.hasLink(links[1]), false);
    test.equal(myGraph.hasLink({id: 5, label: "A->B", src: 1, dst: 2,direction: 0}), false);
    test.end();
});
