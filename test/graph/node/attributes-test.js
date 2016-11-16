var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Get and set color of a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, color: "red"}, {id: 2}]);

    test.equal(myGraph.nodes()[0].color(), "red");
    test.equal(myGraph.nodes()[1].color(), myGraph.config.color);
    myGraph.nodes()[0].color('#666888');
    test.equal(myGraph.nodes()[0].color(), "#666888");


    test.end();
});

tape("Disable and enable a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, disabled: true}, {id: 2}]);
    
    test.equal(myGraph.nodes()[0].disabled(), true);
    test.equal(myGraph.nodes()[1].disabled(), false);
    myGraph.nodes()[0].disabled(false);
    test.equal(myGraph.nodes()[0].disabled(), false);
    
    
    test.end();
});

tape("Get and set icon of a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, icon: "fa fa-male"}, {id: 2}]);
    
    test.equal(myGraph.nodes()[0].icon(), "fa fa-male");
    test.equal(myGraph.nodes()[1].icon(), "");
    myGraph.nodes()[0].icon('fa fa-female');
    test.equal(myGraph.nodes()[0].icon(), "fa fa-female");
    
    test.end();
});

tape("Get and set mugshot of a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, mugshot: "foo.png"}, {id: 2}]);
    
    test.equal(myGraph.nodes()[0].mugshot(), "foo.png");
    test.equal(myGraph.nodes()[1].mugshot(), "");
    myGraph.nodes()[0].mugshot('bar.png');
    test.equal(myGraph.nodes()[0].mugshot(), "bar.png");
    
    test.end();
});

tape("Get and set _grouped property of a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}]);
    
    test.equal(myGraph.nodes()[0].grouped(), false);
    myGraph.nodes()[0].grouped(true);
    test.equal(myGraph.nodes()[0].grouped(), true);
    
    test.end();
});

tape("Get and set label of a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes({id: 1, label: "a"});
    
    test.equal(myGraph.nodes()[0].label(), "a");
    myGraph.nodes()[0].label('abc');
    test.equal(myGraph.nodes()[0].label(), "abc");
    
    test.end();
});

tape("Get and set radius of a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, radius: 30}, {id: 2}]);
    
    test.equal(myGraph.nodes()[0].radius(), 30);
    test.equal(myGraph.nodes()[1].radius(), myGraph.config.radius);
    myGraph.nodes()[0].radius(40);
    test.equal(myGraph.nodes()[0].radius(), 40);
    
    test.end();
});

tape("Select a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, selected: true}, {id: 2}]);
    
    test.equal(myGraph.nodes()[0].selected(), true);
    myGraph.nodes()[1].selected(true);
    test.equal(myGraph.nodes()[1].selected(), true);
    
    test.end();
});

tape("Transform Node should mark Node's _transform true.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}]);
    
    
    test.equal(myGraph.nodes()[0].transformed(), false);
    myGraph.nodes()[0].transformed(true);
    test.equal(myGraph.nodes()[0]._transformed, true);
    
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