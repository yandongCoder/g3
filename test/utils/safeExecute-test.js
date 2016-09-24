var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../dist/js/g3");

tape('If argument is function, execute and return result, else directly return itself', function(test){
    test.equal(g3.utils.safeExecute(1), 1);
    test.equal(g3.utils.safeExecute(function(){return 1}), 1);
    test.end();
});