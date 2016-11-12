var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("select a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, selected: true}, {id: 2}]);
    
    test.equal(myGraph.nodes()[0].selected(), true);
    myGraph.nodes()[1].selected(true);
    test.equal(myGraph.nodes()[1].selected(), true);

    test.end();
});
