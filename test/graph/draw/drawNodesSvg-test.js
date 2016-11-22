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
    
    myGraph.renderImmediately();
    test.equal(myGraph.nodes().length, document.querySelectorAll('.node').length);
    test.end();
});

tape("Node's DOM should correspond Node's property", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");


    var myGraph = g3.graph(svg, {iconPrefix: 'fa fa-',icon: 'default', mugshotPrefix: "./someUrl/", mugshot: "default.png"})
        .nodes([{id: 1, x: 5, y: 0, icon: "male", mugshot: "foo.png", label: "a", selected: true, radius: 30, color: "#123444"},{id: 2}]);
    
    myGraph.renderImmediately();
    
    var firstNode = myGraph.nodes()[0],
        firstNodeEle = document.querySelectorAll(".node")[0],
        secondNode = myGraph.nodes()[1],
        secondNodeEle = document.querySelectorAll(".node")[1];
    //label DOM
    test.equal(firstNodeEle.querySelector(".text-group").querySelector('span').textContent, "a");
    //selected class DOM
    test.equal(firstNodeEle.className, "node selected");
    //radius Attribute
    test.equal(firstNodeEle.querySelector("circle").getAttribute('r'), '30');
    //X, Y DOM
    test.equal(firstNodeEle.getAttribute('transform'), 'translate(5,0)');
    //color Attribute
    test.equal(firstNodeEle.querySelector("circle").style.fill, "#123444");
    //icon
    test.equal(firstNodeEle.querySelector(".icon").querySelector('span').className, "fa fa-male");
    test.equal(secondNodeEle.querySelector(".icon").querySelector('span').className, "fa fa-default");
    
    //mugshot
    test.equal(firstNodeEle.querySelector(".mugshot").querySelector('img').src, "./someUrl/foo.png");
    test.equal(secondNodeEle.querySelector(".mugshot").querySelector('img').src, "./someUrl/default.png");
    
    
    firstNode.attr("label", 'abc');
    firstNode.attr("selected", false);
    firstNode.attr("disabled",true);
    firstNode.attr("radius", 40);
    firstNode._nudge(10, 10);
    firstNode.attr("color",'#666888');
    firstNode.attr("icon",'female');
    firstNode.attr("mugshot", 'bar.png');
    
    myGraph.renderImmediately();
    test.equal(firstNodeEle.querySelector(".text-group").querySelector('span').textContent, "abc");
    test.equal(firstNodeEle.className, "node disabled");
    test.equal(firstNodeEle.querySelector("circle").getAttribute('r'), '40');
    test.equal(firstNodeEle.getAttribute("transform"), 'translate(15,10)');
    test.equal(firstNodeEle.querySelector("circle").style.fill, "#666888");
    test.equal(firstNodeEle.querySelector(".icon").querySelector('span').className, "fa fa-female");
    test.equal(firstNodeEle.querySelector(".mugshot").querySelector('img').src, "./someUrl/bar.png");
    
    test.end();
});

tape("select Node event", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg);

    myGraph.nodes([{id: 1}, {id: 2}])
        .links({id: 1, src: 1, dst: 2, selected: true});
    
    myGraph.renderImmediately();
    var firstNode = myGraph.nodes()[0],
        firstNodeEle = document.querySelectorAll('.node')[0],
        secondNode = myGraph.nodes()[1],
        secondCircle = document.querySelectorAll('.node')[1],
        firstLink = myGraph.links()[0];
    
    //Select a Node when mousedown, and deselect others
    var event = new window.MouseEvent("mousedown");
    firstNodeEle.dispatchEvent(event);
    secondCircle.dispatchEvent(event);
    
    test.equal(firstNode.attr("selected"), false);
    test.equal(secondNode.attr("selected"), true);
    test.equal(firstLink.attr("selected"), false);
    
    //Don't deselect others when press Ctrl key
    myGraph.deselectNodes();
    var eventCtrl = new window.MouseEvent("mousedown", {ctrlKey: true});
    firstNodeEle.dispatchEvent(eventCtrl);
    secondCircle.dispatchEvent(eventCtrl);
    
    test.equal(firstNode.attr("selected"), true);
    test.equal(secondNode.attr("selected"), true);
    
    
    //toggle Node selected status when press Ctrl key
    myGraph.deselectNodes();
    firstNodeEle.dispatchEvent(eventCtrl);
    test.equal(firstNode.attr("selected"), true);
    firstNodeEle.dispatchEvent(eventCtrl);
    test.equal(firstNode.attr("selected"), false);
    
    test.end();
});

tape("Hide label while currentScale < scaleOfNodeLabelHide", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    var myGraph = g3.graph(svg);
    myGraph.nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2}]);
    
    myGraph.scaleTo(myGraph._config.scaleOfHideLabel - 0.1);
    myGraph.renderImmediately();
    
    test.equal(document.querySelectorAll(".node")[0].querySelector(".text-group").style.display, "none");
    test.equal(document.querySelectorAll(".link-info")[0].style.display, "none");
    
    test.end();
});