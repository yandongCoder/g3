var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");

tape("If any one of links Data between a couple Nodes marked merged, then merge them", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    
    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2, merged: true}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);
    
    test.equal(myGraph.links().length, 5);
    test.equal(myGraph.getRenderedLinks().length, 2);
    test.deepEqual(myGraph.links()[4].mergedBy.length, 3);
    test.deepEqual(myGraph.links()[4].mergedBy, [myGraph.links()[0], myGraph.links()[1], myGraph.links()[2]]);
    test.end();
    
});

tape("PreMerge using flatten merge, so not has nested mergedBy", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2, merged: true}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    myGraph.links({id:5, src: 2, dst: 1, merged: true});
    test.deepEqual(myGraph.links()[5].mergedBy.length, 4);
    test.deepEqual(myGraph.links()[5].mergedBy, [myGraph.links()[0], myGraph.links()[1], myGraph.links()[2], myGraph.links()[4]]);
    test.end();

});

tape("if a new kink added to mergedLinks between couple Nodes, merged only if new link's merge is true, otherwise not", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2, merged: true}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    test.equal(myGraph.links().length, 5);
    test.equal(myGraph.getRenderedLinks().length, 2);

    myGraph.links({id:5, src: 2, dst: 1});
    test.equal(myGraph.links().length, 6);
    test.equal(myGraph.getRenderedLinks().length, 3);
    test.deepEqual(myGraph.links()[4].mergedBy.length, 3);
    test.deepEqual(myGraph.links()[4].mergedBy, [myGraph.links()[0], myGraph.links()[1], myGraph.links()[2]]);
    test.end();

});