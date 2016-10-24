var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");
    d3 = require("d3");


tape("nodes DOM should correspond _nodes always", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    global.window = document.defaultView;

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
        //label DOM
        test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].querySelector(".text-group").querySelector('span').textContent, "a");
        //selected class DOM
        test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].className, "node selected");
        //radius Attribute
        test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].querySelector("circle").getAttribute('r'), '30');
        //X, Y DOM
        test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].getAttribute('transform'), 'translate(5,0)');
        //color Attribute
        test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].querySelector("circle").style.fill, "#123444");

        myGraph.nodes()[0].label('abc');
        myGraph.nodes()[0].selected(false);
        myGraph.nodes()[0].radius(40);
        myGraph.nodes()[0].nudge(10, 10);
        myGraph.nodes()[0].color('#666888');

        myGraph.render(function(){
            test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].querySelector(".text-group").querySelector('span').textContent, "abc");
            test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].className, "node");
            test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].querySelector("circle").getAttribute('r'), '40');
            test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].getAttribute("transform"), 'translate(15,10)');
            test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].querySelector("circle").style.fill, "#666888");

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

        //Select a Node when mousedown, and unselect others
        document.querySelectorAll('.node')[0].click();
        document.querySelectorAll('.node')[1].click();

        test.equal(myGraph.nodes()[0].selected(), false);
        test.equal(myGraph.nodes()[1].selected(), true);

        
        //Don't unselect others when press Ctrl key
        myGraph.unselectNodes();
        var eventCtrl = new window.MouseEvent("click", {ctrlKey: true});
        document.querySelectorAll('.node')[0].dispatchEvent(eventCtrl);
        document.querySelectorAll('.node')[1].dispatchEvent(eventCtrl);

        test.equal(myGraph.nodes()[0].selected(), true);
        test.equal(myGraph.nodes()[1].selected(), true);


        //toggle Node selected status when press Ctrl key
        myGraph.unselectNodes();
        document.querySelectorAll('.node')[0].dispatchEvent(eventCtrl);
        test.equal(myGraph.nodes()[0].selected(), true);
        document.querySelectorAll('.node')[0].dispatchEvent(eventCtrl);
        test.equal(myGraph.nodes()[0].selected(), false);

        test.end();
    });
});