var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");

tape("get links by id filter", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg);


    myGraph.nodes([{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}]);
    var links = [{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 1, dst: 5}, {id: 4, src: 5, dst: 6}, {id: 5, src: 5, dst: 2}];
    myGraph.links(links);

    test.equal(myGraph.links().length, 5);
    //by Id
    test.deepEqual(myGraph.getLinks(1), [myGraph.links()[0]]);

    //by Link
    test.deepEqual(myGraph.getLinks(myGraph.links()[3]), [myGraph.links()[3]]);

    //by Id array
    test.deepEqual(myGraph.getLinks([4, 5]), [myGraph.links()[3], myGraph.links()[4]]);


    //by Id obj
    test.deepEqual(myGraph.getLinks({id: 2}), [myGraph.links()[1]]);

    //by Id obj Array
    test.deepEqual(myGraph.getLinks([{id: 2}, {id: 3}]), [myGraph.links()[1], myGraph.links()[2]]);
    test.end();


});