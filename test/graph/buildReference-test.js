var tape = require("tape"),
    jsdom = require("jsdom");

//g3 rely on those variable, add to global in first test.
var document = jsdom.jsdom('');
global.window = document.defaultView;
global.document = document;
global.d3 = require("d3");
global.SVGElement = function SVGElement() {};//TODO Jsdom not has SVGElement implement yet, this sentence just void test error
global.cancelAnimationFrame = clearTimeout;
global.requestAnimationFrame = setTimeout;