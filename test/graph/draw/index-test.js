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
    var triggerOnNodeMouseDown = false,
        triggerOnLinkContextmenu = false,
        triggerOnGraphClick = false;
    
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    
    var svg = document.querySelector("#graph");
    var myGraph = g3.graph(svg, {
        bindNodeEvent: function(selection){
            selection.on('mousedown', function(Node, i){
                triggerOnNodeMouseDown = true;
                test.equal(i, 0);
                test.deepEqual(Node, firstNode);
                test.deepEqual(this, firstNodeEle);
            })
        },
        bindLinkEvent: function(selection){
            selection.on('contextmenu', function(Link, i){
                triggerOnLinkContextmenu = true;
                test.equal(i, 0);
                test.deepEqual(Link, firstLink);
                test.deepEqual(this, firstLinkEle);
            });
        },
        bindGraphEvent: function(selection){
            selection.on('click', function(){
                triggerOnGraphClick = true;
            });
        }
    });
    myGraph.nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2}]);
    myGraph.render();
    
    var firstNode = myGraph.nodes()[0],
        firstNodeEle = document.querySelector('.node'),
        firstLink = myGraph.links()[0],
        firstLinkEle = document.querySelectorAll('.link')[0];
    
    var mouseDownEvent = new window.MouseEvent("mousedown"),
        clickEvent = new window.MouseEvent("click"),
        contextMenuEvent = new window.MouseEvent('contextmenu');
    
    svg.dispatchEvent(clickEvent);
    test.equal(triggerOnGraphClick, true);
    
    firstNodeEle.dispatchEvent(mouseDownEvent);
    test.equal(triggerOnNodeMouseDown, true);
    
    firstLinkEle.dispatchEvent(contextMenuEvent);
    test.equal(triggerOnLinkContextmenu, true);
    
    
    
    test.end();
});