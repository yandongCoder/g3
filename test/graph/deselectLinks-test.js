var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("unselect Links", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2, selected: true}, {id: 2, src: 1, dst: 2, selected: true}]);
    
    myGraph.unselectLinks(1);
    test.equal(myGraph.links()[0].selected(), false);
    myGraph.unselectLinks();
    test.equal(myGraph.links()[1].selected(), false);
    
    test.end();
});