var tape = require("tape"),
    jsdom = require("jsdom");
    g3 = require("../../dist/js/g3");


tape("g3 select svg correctly whether selector is id or DOM", function(test){
    var document = global.document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    
    test.deepEqual(g3.graph("#graph"), g3.graph(svg));

    test.end();
});
