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