var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Get json string of a Node.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 10, y: 10, radius: 10}]);
    
    console.log(JSON.stringify(myGraph.nodes()[0].getJSON()));
    test.deepEqual(myGraph.nodes()[0].getJSON(), {color: myGraph._config.color, disabled: false, icon:"", id:1, label: "", mugshot: '', x:10, y:10, radius:10, selected:false});
    
    test.end();
});

tape("Node's groupedBy property only maintain id array in json string.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 2, dst: 3}, {id:3, src: 3, dst: 2}]);
    
    myGraph.group([myGraph.nodes()[0], myGraph.nodes()[1]]);
    
    test.equal(myGraph.nodes()[0].getJSON().grouped, true);
    test.deepEqual(myGraph.nodes()[3].getJSON(), {id:"grouped:1&2", icon: "", label:"&", mugshot: '', x:0, y:0, radius:15, color:"#359aff", disabled: false, selected:false, groupedBy:{nodes:[1,2], links:[1], attachedLinks: [{link:3, originalTarget:2},{link:2, originalSource:2}]}});
    
    test.end();
});