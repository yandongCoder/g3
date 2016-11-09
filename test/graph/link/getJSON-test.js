var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Get json of a Link.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id:1, src: 1, dst: 2,label: 'x', 'foo': 'bar'}]);
    
    test.deepEqual(myGraph.links()[0].getJSON(), {"id":1,"label":"x","width":3,"color":"#a1a1a1","src":1,"dst":2,"direction":1,"foo":"bar"});
    
    test.end();
});

tape("Link's mergedBy property only maintain id array in json.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}]);
    
    myGraph.links()[0].merge();
    
    test.deepEqual(myGraph.links()[3].getJSON(), {"id":"merged:1&2&3","label":"&&","width":3,"color":"#ffffff","src":1,"dst":2,"direction":1,"mergedBy":[1,2,3]});
    
    test.end();
});

tape("Link's transformedBy property only maintain id array in json.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id: 2, src: 1, dst: 3}]);
    
    myGraph.nodes()[0].NtoL();
    
    test.deepEqual(myGraph.links()[2].getJSON(), {"id":"transformed:(1)1(2)","label":"()()","width":3,"color":"#123456","src":2,"dst":3,"direction":1,"transformedBy":{"node":1,"links":[1,2]}});
    
    test.end();
});