var tape = require("tape"),
    g3 = require("../../dist/js/g3");

//deselectNodes method
tape("deselect Nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0, selected: true}, {id: 2, x: 100, y: 0, selected: true}]);
    
    myGraph.deselectNodes();
    test.equal(myGraph.nodes()[1].attr("selected"), false);
    
    test.end();
});
//TODO selectLinks test
//TODO deselectAll test
//deselectLinks method
tape("deselect Links", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2, selected: true}, {id: 2, src: 1, dst: 2, selected: true}]);
    
    
    myGraph.deselectLinks();
    test.equal(myGraph.links()[1].attr("selected"), false);
    
    test.end();
});

//selectNodes method
tape("Select Nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}]);

    myGraph.selectNodes(1);
    test.equal(myGraph.nodes()[0].attr("selected"), true);
    test.equal(myGraph.nodes()[1].attr("selected"), false);

    myGraph.selectNodes(2);
    test.equal(myGraph.nodes()[0].attr("selected"), false);
    test.equal(myGraph.nodes()[1].attr("selected"), true);

    test.end();
});

tape("Don't deselect other Nodes, if second argument of selectNodes method is true", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}]);

    myGraph.selectNodes(1);
    myGraph.selectNodes(2, true);
    test.equal(myGraph.nodes()[0].attr("selected"), true);
    test.equal(myGraph.nodes()[1].attr("selected"), true);

    test.end();
});

// TODO test disableXX and enableXX