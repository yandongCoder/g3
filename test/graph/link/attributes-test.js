var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Get and set color of a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2, color: "red"}, {id: 2, src: 2, dst: 1}]);

    test.equal(myGraph.links()[0].color(), "red");
    test.equal(myGraph.links()[1].color(), myGraph.config.linkColor);
    myGraph.links()[0].color('#666888');
    test.equal(myGraph.links()[0].color(), "#666888");

    test.end();
});

tape("Get and set direction of a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2}]);
    
    test.equal(myGraph.links()[0].direction(), 1);
    myGraph.links()[0].direction(2);
    test.equal(myGraph.links()[0].direction(), 2);
    
    test.end();
});

tape("Get and set label of a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2, label: "a"}]);
    
    test.equal(myGraph.links()[0].label(), "a");
    myGraph.links()[0].label('abc');
    test.equal(myGraph.links()[0].label(), "abc");
    
    test.end();
});

tape("Get and set _merge property of a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2}, {id: 2, src: 1, dst: 2}]);
    
    test.equal(myGraph.links()[0].merged(), false);
    myGraph.links()[0].merged(true);
    test.equal(myGraph.links()[0].merged(), true);
    
    test.end();
});

tape("Select a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2, selected: true}, {id:2, src: 1, dst: 2}]);
    
    test.equal(myGraph.links()[0].selected(), true);
    myGraph.links()[1].selected(true);
    test.equal(myGraph.links()[1].selected(), true);
    
    test.end();
});

tape("Get and set width of a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
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
    
    test.end();
});

tape("Transform Link should mark this Link's _transform true.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}]);
    
    test.equal(myGraph.links()[0].transformed(), false);
    myGraph.links()[0].transformed(true);
    test.equal(myGraph.links()[0]._transformed, true);
    
    test.end();
});
