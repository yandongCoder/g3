var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("Merge all Links between a couple Nodes", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    //merge many times equal merge one time, idempotent (幂等性)
    myGraph.links()[0].merge();
    myGraph.links()[0].merge();
    myGraph.links()[1].merge();

    test.equal(myGraph.links().length, 5);
    test.equal(myGraph.getRenderedLinks().length, 2);
    test.deepEqual(myGraph.links()[4].mergedBy, [myGraph.links()[0], myGraph.links()[1], myGraph.links()[2]]);
    test.end();

});

tape("Don't merge Link if only one Link between a couple Nodes", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    myGraph.links()[3].merge();
    test.equal(myGraph.links().length, 4);
    test.equal(myGraph.getRenderedLinks().length, 4);
    test.end();

});

tape("merge Links, add new Link between this couple Nodes, merge again.", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    
    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);
    
    myGraph.links()[0].merge();
    test.equal(myGraph.links().length, 5);
    test.equal(myGraph.getRenderedLinks().length, 2);
    
    myGraph.links({id: 5, src: 1, dst: 2});
    test.equal(myGraph.links().length, 6);
    test.equal(myGraph.getRenderedLinks().length, 3);
    
    myGraph.links()[4].merge();
    myGraph.links()[1].merge();//idempotent (幂等性)
    
    test.equal(myGraph.links().length, 7);
    test.equal(myGraph.getRenderedLinks().length, 2);
    test.deepEqual(myGraph.links()[6].mergedBy, [myGraph.links()[4], myGraph.links()[5]]);
    test.deepEqual(myGraph.links()[6].mergedBy[0], myGraph.links()[4]);
    test.end(); 

});