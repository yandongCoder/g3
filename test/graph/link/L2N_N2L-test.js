var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

//LtoN method
tape("Transform Link to Node according to transformedBy", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id: 2, src: 1, dst: 3}]);

    myGraph.nodes()[0].NtoL();
    test.equal(myGraph.getRenderedNodes().length, 2);
    test.equal(myGraph.links().length, 3);
    test.equal(myGraph.getRenderedLinks().length, 1);

    myGraph.links()[2].LtoN();
    test.equal(myGraph.getRenderedNodes().length, 3);
    test.equal(myGraph.nodes()[0].transformed(), false);

    test.equal(myGraph.links().length, 2);
    test.equal(myGraph.getRenderedLinks().length, 2);
    test.equal(myGraph.links()[0].transformed(), false);
    test.equal(myGraph.links()[1].transformed(), false);

    test.end();

});

//NtoL method
tape("Transform Link's source or/and target, if Link is not transformed but source or target are transformed", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id: 2, src: 1, dst: 3}]);
    
    myGraph.nodes()[0].NtoL();
    myGraph._addLink({id: 3, src: 1, dst: 2});
    myGraph.links()[3].NtoL();
    test.equal(myGraph.links().length, 4);
    test.equal(myGraph.getRenderedLinks().length, 1);
    
    test.deepEqual(myGraph.links()[3].transformedBy.links, [myGraph.links()[0], myGraph.links()[2], myGraph.links()[1]]);
    
    test.end();
});