var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");
    d3 = require("d3");


tape("nodes DOM should correspond _nodes always", function(test){
    // var document = jsdom.jsdom('<canvas id="graph"></canvas>');
    // var svg = document.querySelector("#graph");
    // global.window = document.defaultView;
    //
    // var myGraph = g3.graph(svg, {autoRender: true});
    //
    // var nodes = [{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}];
    // myGraph.nodes(nodes);
    //
    // test.equal(myGraph.nodes().length, document.querySelector('.nodes').querySelectorAll('.node').length);
    //
    // //by Id
    // myGraph.removeNodes(1);
    // test.equal(myGraph.nodes().length, document.querySelector('.nodes').querySelectorAll('.node').length);
    //
    // //by Node
    // myGraph.removeNodes(nodes[1]);
    // test.equal(myGraph.nodes().length, document.querySelector('.nodes').querySelectorAll('.node').length);
    //
    // //by Id array
    // myGraph.removeNodes([3]);
    // test.equal(myGraph.nodes().length, document.querySelector('.nodes').querySelectorAll('.node').length);
    //
    // //by Id obj
    // myGraph.removeNodes({id: 4});
    // test.equal(myGraph.nodes().length, document.querySelector('.nodes').querySelectorAll('.node').length);
    //
    // //by Id obj Array
    // myGraph.removeNodes({id: 5});
    // test.equal(myGraph.nodes().length, document.querySelector('.nodes').querySelectorAll('.node').length);
    test.end();
});

tape("Node's DOM should correspond Node's property", function(test){
    // var document = jsdom.jsdom('<canvas id="graph"></canvas>');
    // var svg = document.querySelector("#graph");
    //
    //
    // var myGraph = g3.graph(svg, {autoRender: true})
    //     .nodes({id: 1, x: 5, y: 0, label: "a", selected: true, radius: 30, color: "#123444"});
    //
    // //label DOM
    // test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].querySelector(".text-group").querySelector('span').textContent, "a");
    // myGraph.nodes()[0].label('abc');
    // test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].querySelector(".text-group").querySelector('span').textContent, "abc");
    //
    // //selected class DOM
    // test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].className, "node selected");
    // myGraph.nodes()[0].selected(false);
    // test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].className, "node");
    //
    // //radius Attribute
    // test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].querySelector("circle").getAttribute('r'), '30');
    // myGraph.nodes()[0].radius(40);
    // test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].querySelector("circle").getAttribute('r'), '40');
    //
    // //X, Y DOM
    // test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].getAttribute('transform'), 'translate(5,0)');
    // myGraph.nodes()[0].nudge(10, 10);
    // test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].getAttribute("transform"), 'translate(15,10)');
    //
    // //color Attribute
    // test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].querySelector("circle").style.fill, "#123444");
    // myGraph.nodes()[0].color('#666888');
    // test.equal(document.querySelector(".nodes").querySelectorAll(".node")[0].querySelector("circle").style.fill, "#666888");
    test.end();
});