var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");


// tape("If multiple render is short enough, only render once", function(test){
//     var document = jsdom.jsdom('<svg id="graph"></svg>');
//     var svg = document.querySelector("#graph");
//
//     var myGraph = g3.graph(svg);
//
//     var count = 0;
//     myGraph.render(null, function(){
//        count++;
//     });
//     myGraph.render(null, function(){
//         count++;
//         test.equal(count, 1);
//         test.end();
//     });
// });