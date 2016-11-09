var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Get json string of a Link.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id:1, src: 1, dst: 2,label: 'x', 'foo': 'bar'}]);
    
    test.equal(myGraph.links()[0].getJSON(), '{"id":1,"label":"x","width":3,"color":"#a1a1a1","src":1,"dst":2,"direction":1,"foo":"bar"}');
    
    test.end();
});

tape("Link's mergedBy property only maintain id array in json string.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}]);
    
    myGraph.links()[0].merge();
    
    test.equal(myGraph.links()[3].getJSON(), '{"id":"merged:1&2&3","label":"&&","width":3,"color":"#ffffff","src":1,"dst":2,"direction":1,"mergedBy":[1,2,3]}');
    
    test.end();
});