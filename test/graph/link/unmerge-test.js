var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Unmerge Links according to mergedBy", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    myGraph.links()[0].merge();

    myGraph.links()[4].unmerge();

    test.equal(myGraph.links().length, 4);
    test.equal(myGraph.getRenderedLinks().length, 4);

    test.end();

});


tape("Unmerge a unmerged Link does not matter", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
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

tape("Unmerge Links that has been transformed(NtoL)", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    myGraph.links()[0].merge();
    myGraph.nodes()[1].NtoL();
    test.equal(myGraph.links().length, 6);
    test.equal(myGraph.getRenderedLinks().length, 1);
    test.deepEqual(myGraph.getRenderedLinks()[0].transformedBy.links, [myGraph.links()[4], myGraph.links()[3]]);

    myGraph.links()[4].unmerge();
    test.equal(myGraph.links().length, 5);
    test.equal(myGraph.getRenderedLinks().length, 1);
    test.deepEqual(myGraph.getRenderedLinks()[0].transformedBy.links, [myGraph.links()[0], myGraph.links()[1], myGraph.links()[2], myGraph.links()[3]]);

    test.end();

});

