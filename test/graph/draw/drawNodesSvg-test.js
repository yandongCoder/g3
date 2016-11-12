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

    myGraph.render(function(){
        test.equal(myGraph.nodes().length, document.querySelector('.nodes').querySelectorAll('.node').length);
        test.end();
    });
});

tape("Node's DOM should correspond Node's property", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");


    var myGraph = g3.graph(svg)
        .nodes({id: 1, x: 5, y: 0, label: "a", selected: true, radius: 30, color: "#123444"});

    test.plan(10);
    myGraph.render(function(){
        var firstNode = myGraph.nodes()[0];
        var firstEle = document.querySelector(".nodes").querySelectorAll(".node")[0];
        //label DOM
        test.equal(firstEle.querySelector(".text-group").querySelector('span').textContent, "a");
        //selected class DOM
        test.equal(firstEle.className, "node selected");
        //radius Attribute
        test.equal(firstEle.querySelector("circle").getAttribute('r'), '30');
        //X, Y DOM
        test.equal(firstEle.getAttribute('transform'), 'translate(5,0)');
        //color Attribute
        test.equal(firstEle.querySelector("circle").style.fill, "#123444");
    
    
        firstNode.label('abc');
        firstNode.selected(false);
        firstNode.radius(40);
        firstNode.nudge(10, 10);
        firstNode.color('#666888');

        myGraph.render(function(){
            test.equal(firstEle.querySelector(".text-group").querySelector('span').textContent, "abc");
            test.equal(firstEle.className, "node");
            test.equal(firstEle.querySelector("circle").getAttribute('r'), '40');
            test.equal(firstEle.getAttribute("transform"), 'translate(15,10)');
            test.equal(firstEle.querySelector("circle").style.fill, "#666888");

            test.end();
        });
    });
});

tape("select Node event", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg);

    var nodes = [{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}];
    myGraph.nodes(nodes);

    myGraph.render(function(){
        var firstNode = myGraph.nodes()[0],
            firstEle = document.querySelectorAll('.node')[0],
            secondNode = myGraph.nodes()[1],
            secondEle = document.querySelectorAll('.node')[1];
        
        //Select a Node when mousedown, and unselect others
        var event = new window.MouseEvent("mousedown");
        firstEle.dispatchEvent(event);
        secondEle.dispatchEvent(event);

        test.equal(firstNode.selected(), false);
        test.equal(secondNode.selected(), true);

        
        //Don't unselect others when press Ctrl key
        myGraph.unselectNodes();
        var eventCtrl = new window.MouseEvent("mousedown", {ctrlKey: true});
        firstEle.dispatchEvent(eventCtrl);
        secondEle.dispatchEvent(eventCtrl);

        test.equal(firstNode.selected(), true);
        test.equal(secondNode.selected(), true);


        //toggle Node selected status when press Ctrl key
        myGraph.unselectNodes();
        firstEle.dispatchEvent(eventCtrl);
        test.equal(firstNode.selected(), true);
        firstEle.dispatchEvent(eventCtrl);
        test.equal(firstNode.selected(), false);

        test.end();
    });
});