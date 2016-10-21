var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Get connected links of Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false});

    myGraph.nodes([{id: 1}, {id: 2},{id: 3}]);
    var links = [{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}];
    myGraph.links(links);

    test.deepEqual(myGraph.nodes()[0].getConnectedLinks(), [myGraph.links()[0]]);
    test.deepEqual(myGraph.nodes()[1].getConnectedLinks(), [myGraph.links()[0], myGraph.links()[1]]);
    test.deepEqual(myGraph.nodes()[2].getConnectedLinks(), [myGraph.links()[1]]);

    test.end();

});

tape("If connected links is merged, get the derived Link.", function(test){
    var myGraph = g3.graph(null, {ifRender: false});

    myGraph.nodes([{id: 1}, {id: 2},{id: 3}]);
    var links = [{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 3, dst: 2}];
    myGraph.links(links);
    myGraph.links()[2].merge();

    test.deepEqual(myGraph.nodes()[0].getConnectedLinks(), [myGraph.links()[0]]);
    test.deepEqual(myGraph.nodes()[1].getConnectedLinks(), [myGraph.links()[0], myGraph.links()[3]]);
    test.deepEqual(myGraph.nodes()[2].getConnectedLinks(), [myGraph.links()[3]]);

    test.end();

});

tape("If connected links is transformed, get the derived Link.", function(test){
    var myGraph = g3.graph(null, {ifRender: false});

    myGraph.nodes([{id: 1}, {id: 2},{id: 3}]);
    var links = [{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 3, dst: 2}];
    myGraph.links(links);
    myGraph.nodes()[1].NtoL();

    test.deepEqual(myGraph.nodes()[0].getConnectedLinks(), [myGraph.links()[3]]);
    test.deepEqual(myGraph.nodes()[1].getConnectedLinks(), [myGraph.links()[0], myGraph.links()[1], myGraph.links()[2]]);
    test.deepEqual(myGraph.nodes()[2].getConnectedLinks(), [myGraph.links()[3]]);

    test.end();

});

tape("If grouped argument is true, return Links grouped by 'between Nodes'", function(test){
    var myGraph = g3.graph(null, {ifRender: false});

    myGraph.nodes([{id: 1}, {id: 2},{id: 3}]);
    var links = [{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 3, dst: 2}];
    myGraph.links(links);

    test.deepEqual(myGraph.nodes()[0].getConnectedLinks(true), [[myGraph.links()[0]]]);
    test.deepEqual(myGraph.nodes()[1].getConnectedLinks(true), [[myGraph.links()[0]], [myGraph.links()[1], myGraph.links()[2]]]);
    test.deepEqual(myGraph.nodes()[2].getConnectedLinks(true), [[myGraph.links()[1], myGraph.links()[2]]]);

    myGraph.links()[2].merge();
    test.deepEqual(myGraph.nodes()[1].getConnectedLinks(true), [[myGraph.links()[0]], [myGraph.links()[3]]]);

    test.end();
});
