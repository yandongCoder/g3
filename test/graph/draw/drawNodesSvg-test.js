var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("Nodes DOM should correspond _nodes always", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg);

    var nodes = [{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}];
    myGraph.nodes(nodes);
    myGraph.removeNodes(1);
    
    myGraph.render('IMMEDIATELY');
    test.equal(myGraph.nodes().length, document.querySelectorAll('.node').length);
    test.end();
});

tape("Node's DOM should correspond Node's property", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");


    var myGraph = g3.graph(svg)
        .nodes({id: 1, x: 5, y: 0, label: "a", selected: true, radius: 30, color: "#123444"});
    
    myGraph.render('IMMEDIATELY');
    
    var firstNode = myGraph.nodes()[0];
    var firstCircle = document.querySelectorAll(".node")[0];
    //label DOM
    test.equal(firstCircle.querySelector(".text-group").querySelector('span').textContent, "a");
    //selected class DOM
    test.equal(firstCircle.className, "node selected");
    //radius Attribute
    test.equal(firstCircle.querySelector("circle").getAttribute('r'), '30');
    //X, Y DOM
    test.equal(firstCircle.getAttribute('transform'), 'translate(5,0)');
    //color Attribute
    test.equal(firstCircle.querySelector("circle").style.fill, "#123444");
    
    
    firstNode.label('abc');
    firstNode.selected(false);
    firstNode.radius(40);
    firstNode.nudge(10, 10);
    firstNode.color('#666888');
    
    myGraph.render('IMMEDIATELY');
    test.equal(firstCircle.querySelector(".text-group").querySelector('span').textContent, "abc");
    test.equal(firstCircle.className, "node");
    test.equal(firstCircle.querySelector("circle").getAttribute('r'), '40');
    test.equal(firstCircle.getAttribute("transform"), 'translate(15,10)');
    test.equal(firstCircle.querySelector("circle").style.fill, "#666888");
    
    test.end();
});

tape("select Node event", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg);

    myGraph.nodes([{id: 1}, {id: 2}])
        .links({id: 1, src: 1, dst: 2, selected: true});
    
    myGraph.render('IMMEDIATELY');
    var firstNode = myGraph.nodes()[0],
        firstCircle = document.querySelectorAll('.node')[0],
        secondNode = myGraph.nodes()[1],
        secondCircle = document.querySelectorAll('.node')[1],
        firstLink = myGraph.links()[0];
    
    //Select a Node when mousedown, and deselect others
    var event = new window.MouseEvent("mousedown");
    firstCircle.dispatchEvent(event);
    secondCircle.dispatchEvent(event);
    
    test.equal(firstNode.selected(), false);
    test.equal(secondNode.selected(), true);
    test.equal(firstLink.selected(), false);
    
    //Don't deselect others when press Ctrl key
    myGraph.deselectNodes();
    var eventCtrl = new window.MouseEvent("mousedown", {ctrlKey: true});
    firstCircle.dispatchEvent(eventCtrl);
    secondCircle.dispatchEvent(eventCtrl);
    
    test.equal(firstNode.selected(), true);
    test.equal(secondNode.selected(), true);
    
    
    //toggle Node selected status when press Ctrl key
    myGraph.deselectNodes();
    firstCircle.dispatchEvent(eventCtrl);
    test.equal(firstNode.selected(), true);
    firstCircle.dispatchEvent(eventCtrl);
    test.equal(firstNode.selected(), false);
    
    test.end();
});

tape("Hide label while currentScale < scaleOfNodeLabelHide", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    var myGraph = g3.graph(svg);
    myGraph.nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2}]);
    
    myGraph.scaleTo(myGraph.config.scaleOfHideLabel - 0.1);
    myGraph.render('IMMEDIATELY');
    
    test.equal(document.querySelectorAll(".node")[0].querySelector(".text-group").style.display, "none");
    test.equal(document.querySelectorAll(".link-label")[0].style.display, "none");
    
    test.end();
});