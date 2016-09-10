var tape = require("tape"),
    g3 = require("../../dist/js/g3");


tape("get length of str", function(test){
    test.equal(g3.utils.getStrLen('abc123'), 6);
    test.equal(g3.utils.getStrLen(123456), 6);
    test.equal(g3.utils.getStrLen("我爱a1"), 6);
    
    test.end();
});
