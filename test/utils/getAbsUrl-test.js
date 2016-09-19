var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("get absolute url without hash", function(test){

    test.equal(g3.utils.getAbsUrl(), "about:blank");
    test.equal(g3.utils.getAbsUrl("http://website.com/a/b/c.html#abc"), "http://website.com/a/b/c.html");
    test.equal(g3.utils.getAbsUrl("http://website.com/a/b/c.html"), "http://website.com/a/b/c.html");

    test.end();
});
