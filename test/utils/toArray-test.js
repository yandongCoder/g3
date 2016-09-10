var tape = require("tape"),
    g3 = require("../../dist/js/g3");


tape("transform to array type if parameter is not array", function(test){
    test.equal(Array.isArray(g3.utils.toArray([{a: 1}])), true);
    test.equal(Array.isArray(g3.utils.toArray(1)), true);
    test.equal(Array.isArray(g3.utils.toArray("a")), true);
    test.equal(Array.isArray(g3.utils.toArray({a:1})), true);

    test.end();
});
