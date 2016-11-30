var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Get and set attr of a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}]);
    
    test.equal(myGraph.nodes()[0].attr("foo"), undefined);
    myGraph.nodes()[0].attr('foo', 'bar');
    test.equal(myGraph.nodes()[0].attr("foo"), 'bar');
    
    test.end();
});

tape("Get and set color of a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, color: "red"}, {id: 2}]);

    test.equal(myGraph.nodes()[0].attr("color"), "red");
    test.equal(myGraph.nodes()[1].attr("color"), myGraph._config.color);

    test.end();
});

tape("Disable and enable a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, disabled: true}, {id: 2}]);
    
    test.equal(myGraph.nodes()[0].attr("disabled"), true);
    test.equal(myGraph.nodes()[1].attr("disabled"), false);
    
    test.end();
});

tape("Get and set icon of a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, icon: "fa fa-male"}, {id: 2}]);
    
    test.equal(myGraph.nodes()[0].attr("icon"), "fa fa-male");
    test.equal(myGraph.nodes()[1].attr("icon"), "");
    
    test.end();
});

tape("Get and set mugshot of a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, mugshot: "foo.png"}, {id: 2}]);
    
    test.equal(myGraph.nodes()[0].attr("mugshot"), "foo.png");
    test.equal(myGraph.nodes()[1].attr("mugshot"), "");
    
    test.end();
});

tape("Get and set _grouped property of a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}]);
    
    test.equal(myGraph.nodes()[0].attr("grouped"), undefined);
    
    test.end();
});

tape("Get and set label of a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes({id: 1, label: "a"});
    
    test.equal(myGraph.nodes()[0].attr("label"), "a");
    
    test.end();
});

tape("Get and set radius of a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, radius: 30}, {id: 2}]);
    
    test.equal(myGraph.nodes()[0].attr("radius"), 30);
    test.equal(myGraph.nodes()[1].attr("radius"), myGraph._config.radius);
    
    test.end();
});

tape("Select a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, selected: true}, {id: 2}]);
    
    test.equal(myGraph.nodes()[0].attr("selected"), true);
    
    test.end();
});

tape("Move X, Y to Node's center point, rather than LeftTop point", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0, radius: 15}, {id: 2, x: 100, y: 100, radius: 200}, {id: 3, x: -100, y: 0, radius: 100}]);
    
    test.equal(myGraph.nodes()[0].x, 0);
    test.equal(myGraph.nodes()[0].y, 0);
    test.equal(myGraph.nodes()[1].x, 100);
    test.equal(myGraph.nodes()[1].y, 100);
    test.equal(myGraph.nodes()[2].x, -100);
    test.equal(myGraph.nodes()[2].y, 0);
    
    test.end();
});
