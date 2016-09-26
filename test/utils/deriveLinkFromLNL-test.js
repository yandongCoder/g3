var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");


tape("derive new Link from received Links&Node&Links", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1, label: "a", size: 50}, {id: 2, label: "b", color: "#445987"}, {id:3, label: "c"}])
        .links([{id: 1, src: 1, dst: 2, label: "L1", color: "#ff0000", width: 5, direction: 1}, {id: 2, src: 2, dst: 1, label: "L2", color: "#00ff00", direction: 2},  {id: 3, src: 2, dst: 3, label: "L3", color: "#00ff00", direction: 2}]);

    var linkObj = g3.utils.deriveLinkFromLNL([myGraph.links()[0], myGraph.links()[1]], myGraph.nodes()[1], [myGraph.links()[2]]);
    test.equal(linkObj.id, "transformed:(merged:1&2)2(3)");
    test.equal(linkObj.label, "(L1&L2)b(L3)");
    test.equal(linkObj.src, myGraph.nodes()[0].id);
    test.equal(linkObj.dst, myGraph.nodes()[2].id);
    test.equal(linkObj.width, 3.5);
    test.equal(linkObj.color, myGraph.nodes()[1].color());
    test.equal(linkObj.direction, 3);

    test.end();
});