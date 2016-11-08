var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Get json string of a Node.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 10, y: 10, radius: 10}]);
    
    test.equal(myGraph.nodes()[0].getJSON(), '{"id":1,"x":10,"y":10,"radius":10,"selected":false}');
    
    test.end();
});

tape("Node's groupedBy property only maintain id array in json string.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 2, dst: 3}, {id:3, src: 3, dst: 2}]);
    
    myGraph.group([myGraph.nodes()[0], myGraph.nodes()[1]]);
    
    test.equal(myGraph.nodes()[3].getJSON(), '{"id":"grouped:1&2","label":"&","x":0,"y":0,"radius":15,"color":"#359aff","selected":false,"groupedBy":{"nodes":[1,2],"links":[1],"attachedLinks":[{"link":2,"originalSource":2},{"link":3,"originalTarget":2}]}}');
    
    test.end();
});