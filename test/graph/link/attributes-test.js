var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("get and set color of a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}])
        .links([{id: 1, src: 1, dst: 2, color: "red"}, {id: 2, src: 2, dst: 1}]);


    test.equal(myGraph.links()[0].color(), "red");
    test.equal(myGraph.links()[1].color(), "#a1a1a1");
    myGraph.links()[0].color('#666888');
    test.equal(myGraph.links()[0].color(), "#666888");

    test.end();
});

tape("get and set direction of a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}])
        .links([{id: 1, src: 1, dst: 2}]);
    
    test.equal(myGraph.links()[0].direction(), 1);
    myGraph.links()[0].direction(2);
    test.equal(myGraph.links()[0].direction(), 2);
    
    test.end();
});

tape("get and set label of a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}])
        .links([{id: 1, src: 1, dst: 2, label: "a"}, {id: 2, src: 1, dst: 2, label: "b"}, {id: 3, src: 1, dst: 2}]);
    
    test.equal(myGraph.links()[0].label(), "a");
    test.equal(myGraph.links()[1].label(), "b");
    test.equal(myGraph.links()[2].label(), "");
    
    myGraph.links()[0].label('abc');
    test.equal(myGraph.links()[0].label(), "abc");
    
    test.end();
});

tape("get and set _merge property of a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2}, {id: 2, src: 1, dst: 2}]);
    
    test.equal(myGraph.links()[0].merged(), false);
    myGraph.links()[0].merged(true);
    test.equal(myGraph.links()[0].merged(), true);
    myGraph.links()[0].merged(false);
    test.equal(myGraph.links()[0].merged(), false);
    
    test.end();
});

tape("select a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2, selected: true}, {id:2, src: 1, dst: 2}]);
    
    test.equal(myGraph.links()[0].selected(), true);
    myGraph.links()[1].selected(true);
    test.equal(myGraph.links()[1].selected(), true);
    
    test.end();
});

tape("get and set width of a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}])
        .links([{id: 1, src: 1, dst: 2}, {id: 2, src: 1, dst: 2, width: 9}]);
    
    
    test.equal(myGraph.links()[0].width(), 3);
    test.equal(myGraph.links()[1].width(), 9);
    
    myGraph.links()[0].width(7);
    test.equal(myGraph.links()[0].width(), 7);
    
    test.end();
});

tape("Get and set _grouped property of a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}])
        .links({id: 1, src: 1, dst: 2});
    
    test.equal(myGraph.links()[0].grouped(), false);
    myGraph.links()[0].grouped(true);
    test.equal(myGraph.links()[0].grouped(), true);
    myGraph.links()[0].grouped(false);
    test.equal(myGraph.links()[0].grouped(), false);
    
    test.end();
});
