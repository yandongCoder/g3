var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");

tape("append svg pre defs correctly", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    g3.graph(svg)._render();
    
    test.equal(svg.firstElementChild.nodeName, "defs");

    test.notEqual(document.querySelector('#shadow'), null);
    test.notEqual(document.querySelector('#start-arrow'), null);
    test.notEqual(document.querySelector('#end-arrow'), null);
    test.notEqual(document.querySelector('#end-arrow-selected'), null);
    test.notEqual(document.querySelector('#linear'), null);
    test.end();
});
