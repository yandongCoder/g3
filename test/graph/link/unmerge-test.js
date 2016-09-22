var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("Unmerge Links according to mergedBy", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    myGraph.links()[0].merge();

    myGraph.links()[4].unmerge();

    test.equal(myGraph.links().length, 4);
    test.equal(myGraph.getRenderedLinks().length, 4);

    test.end();

});


tape("Unmerge a unmerged Link does not matter", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    myGraph.links()[0].unmerge();
    myGraph.links()[1].unmerge();
    myGraph.links()[2].unmerge();
    myGraph.links()[3].unmerge();

    test.equal(myGraph.links().length, 4);
    test.equal(myGraph.getRenderedLinks().length, 4);

    test.end();

});

tape("Unmerge a Link merged by another merged Link, so unmerge again", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    myGraph.links()[0].merge();
    myGraph.links({id: 5, src: 1, dst: 2});
    myGraph.links()[4].merge();


    myGraph.links()[6].unmerge();
    test.equal(myGraph.links().length, 6);
    test.equal(myGraph.getRenderedLinks().length, 3);

    myGraph.links()[4].unmerge();
    test.equal(myGraph.links().length, 5);
    test.equal(myGraph.getRenderedLinks().length, 5);

    test.equal(myGraph.getLinks(function(Link){return Link.groupBy}).length, 0);

    test.end();

});

