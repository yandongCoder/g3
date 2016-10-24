// TODO
// var tape = require("tape"),
//     jsdom = require("jsdom"),
//     g3 = require("../../dist/js/g3");
//
// tape("Show brush when press 'z'", function(test){
//     var document = jsdom.jsdom('<svg id="graph"></svg>');
//     var svg = document.querySelector("#graph");
//
//     var myGraph = g3.graph(svg);
//
//     var nodes = [{id: 1, selected: true}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}];
//     myGraph.nodes(nodes);
//
//     document.dispatchEvent(
//         new window.KeyboardEvent('keydown', { key : 'Escape'  })
//     );
//     myGraph.render(function(){
//         test.equal(myGraph.nodes()[0].selected(), true);
//
//         var event = new window.KeyboardEvent("keydown", {key: "z", char: "z", keyCode: 90});
//
//         document.dispatchEvent(event);
//
//        // console.log(document.getElementsByClassName("brush")[0].style.display);
//         test.equal(myGraph.nodes()[0].selected(), false);
//
//         test.end();
//     });
// });