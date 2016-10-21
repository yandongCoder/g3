var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("Get selected nodes", function(test){
    var myGraph = g3.graph(null, {ifRender: false});


    var nodes = [{id: 1, selected: true}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}];
    myGraph.nodes(nodes);

    myGraph.nodes()[2].selected(true);


    test.equal(myGraph.getSelectedNodes().length, 2);
    test.end();

});