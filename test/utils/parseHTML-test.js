var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");


tape("parse any HTML string to DOM", function(test){
    var document = jsdom.jsdom("");
    var h1 = document.createElement("h1");
    var span = document.createElement("span");

    test.deepEqual(g3.utils.parseHTML("<h1></h1>"), h1);
    test.deepEqual(g3.utils.parseHTML("<span></span>"), span);

    h1.appendChild(span);
    test.deepEqual(g3.utils.parseHTML("<h1><span></span></h1>"), h1);

    test.end();
});
