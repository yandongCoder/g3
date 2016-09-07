var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");

tape("remove link by Link or LinkId", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg);


    myGraph.nodes([{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}]);
    var links = [{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 1, dst: 5}, {id: 4, src: 5, dst: 6}, {id: 5, src: 5, dst: 4}];
    myGraph.links(links);

    test.equal(myGraph.links().length, 5);
    //by Id
    myGraph.removeNodes(1);
    test.equal(myGraph.links().length, 3);

    //by Link
    myGraph.removeNodes(links[1]);
    test.equal(myGraph.links().length, 2);

    //by Id array
    myGraph.removeNodes([3]);
    test.equal(myGraph.links().length, 2);

    //by Id obj
    myGraph.removeNodes({id: 4});
    test.equal(myGraph.links().length, 1);

    //by Id obj Array
    myGraph.removeNodes({id: 5});
    test.equal(myGraph.links().length, 0);
    test.end();
});