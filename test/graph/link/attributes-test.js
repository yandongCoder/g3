var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Get and set attr of a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2}]);
    
    test.equal(myGraph.links()[0].attr("foo"), undefined);
    myGraph.links()[0].attr('foo', 'bar');
    test.equal(myGraph.links()[0].attr("foo"), 'bar');
    
    test.end();
});

tape("Set attr by data or defaultConfig", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2, label: "a", direction: 3, color: "red", disabled: true, merged: true}, {id: 2, src: 2, dst: 1}]);

    test.equal(myGraph.links()[0].attr("color"), "red");
    test.equal(myGraph.links()[1].attr("color"), myGraph._config.linkColor);
    test.equal(myGraph.links()[0].attr("disabled"), true);
    test.equal(myGraph.links()[1].attr("disabled"), false);
    test.equal(myGraph.links()[0].attr("direction"), 3);
    test.equal(myGraph.links()[1].attr("direction"), 1);
    test.equal(myGraph.links()[0].attr("label"), "a");
    test.equal(myGraph.links()[1].attr("label"), "");
    
    test.end();
});


tape("Get and set _merge property of a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2}, {id: 2, src: 1, dst: 2}]);
    
    test.equal(myGraph.links()[0].attr("merged"), undefined);
    
    test.end();
});

tape("Select a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2, selected: true}, {id:2, src: 1, dst: 2}]);
    
    test.equal(myGraph.links()[0].attr("selected"), true);
    
    test.end();
});

tape("Get and set width of a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2}, {id: 2, src: 1, dst: 2, width: 9}]);
    
    
    test.equal(myGraph.links()[0].attr("width"), 3);
    test.equal(myGraph.links()[1].attr("width"), 9);
    
    test.end();
});

tape("Get and set _grouped property of a Link", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}])
        .links({id: 1, src: 1, dst: 2});
    
    test.equal(myGraph.links()[0].attr("grouped"), undefined);
    
    test.end();
});

tape("Transform Link should mark this Link's _transform true.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}]);
    
    test.equal(myGraph.links()[0].transformed(), false);
    
    test.end();
});
