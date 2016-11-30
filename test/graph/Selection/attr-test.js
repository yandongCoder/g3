var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Change attr of Selection", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2},{id: 3}])
        .links([{id:1, src: 1, dst: 2}]);
    
    myGraph.getNodesOP([2, 3]).attr('foo', 'bar');
    myGraph.getLinksOP(1).attr('foo', 'bar');
    
    test.equal(myGraph.nodes()[2].foo, 'bar');
    test.equal(myGraph.links()[0].foo, 'bar');
    
    test.end();
});

tape("Change attr by function", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, bar: "bar"}]);
    
    myGraph.getNodesOP(1).attr('foo', function(Node){return Node.bar});
    
    test.equal(myGraph.nodes()[0].foo, 'bar');
    
    test.end();
});