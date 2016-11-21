var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");


// tape("Canvas type should not has any children", function(test){
//     var document = jsdom.jsdom('<canvas id="graph"></canvas>');
//     var canvas = document.querySelector("#graph");
//
//     var myGraph = g3.graph(canvas);
//
//     myGraph.nodes([{id: 1, x: 0, y: 10}, {id: 2, x: 10, y: 20}]);
//     var links = [{id: 1, src: 1, dst: 2}];
//     myGraph.links(links);
//
//
//     myGraph.render(function(){
//         test.equal(canvas.children.length, 0);
//
//         test.end();
//     });
// });


tape("Custom event callback test.", function(test){
    var triggerOnGraphClick = false,
        triggerOnGraphContextmenu = false,
        triggerOnNodeMouseDown = false,
        triggerOnNodeContextmenu = false,
        triggerOnLinkMouseDown = false,
        triggerOnLinkContextmenu = false;
    
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    
    var svg = document.querySelector("#graph");
    var myGraph = g3.graph(svg, {
        onGraphClick: function () {
            triggerOnGraphClick = true;
            test.deepEqual(this, svg);
        },
        onGraphContextmenu: function(){
            triggerOnGraphContextmenu = true;
            test.deepEqual(this, svg);
        },
        onNodeMouseDown: function(Node, i){
            triggerOnNodeMouseDown = true;
            test.equal(i, 0);
            test.deepEqual(Node, firstNode);
            test.deepEqual(this, firstNodeEle);
        },
        onNodeContextmenu: function(Node, i){
            triggerOnNodeContextmenu = true;
            test.equal(i, 0);
            test.deepEqual(Node, firstNode);
            test.deepEqual(this, firstNodeEle);
        },
        onLinkMouseDown: function(Link, i){
            triggerOnLinkMouseDown = true;
            test.equal(i, 0);
            test.deepEqual(Link, firstLink);
            test.deepEqual(this, firstLinkEle);
        },
        onLinkContextmenu: function(Link, i){
            triggerOnLinkContextmenu = true;
            test.equal(i, 0);
            test.deepEqual(Link, firstLink);
            test.deepEqual(this, firstLinkEle);
        }
        
    });
    myGraph.nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2}]);
    myGraph.renderImmediately();
    
    var firstNode = myGraph.nodes()[0],
        firstNodeEle = document.querySelector('.node'),
        firstLink = myGraph.links()[0],
        firstLinkEle = document.querySelectorAll('.link')[0];
    
    var mouseDownEvent = new window.MouseEvent("mousedown"),
        clickEvent = new window.MouseEvent("click"),
        contextMenuEvent = new window.MouseEvent('contextmenu');
    
    svg.dispatchEvent(clickEvent);
    test.equal(triggerOnGraphClick, true);
    
    svg.dispatchEvent(contextMenuEvent);
    test.equal(triggerOnGraphContextmenu, true);
    
    firstNodeEle.dispatchEvent(mouseDownEvent);
    test.equal(triggerOnNodeMouseDown, true);
    
    firstNodeEle.dispatchEvent(contextMenuEvent);
    test.equal(triggerOnNodeContextmenu, true);
    
    firstLinkEle.dispatchEvent(mouseDownEvent);
    test.equal(triggerOnLinkMouseDown, true);
    
    firstLinkEle.dispatchEvent(contextMenuEvent);
    test.equal(triggerOnLinkContextmenu, true);
    
    test.end();
});