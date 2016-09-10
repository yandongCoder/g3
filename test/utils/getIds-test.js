var tape = require("tape"),
    g3 = require("../../dist/js/g3");


tape("get id array from array", function(test){
    test.deepEqual(g3.utils.getIds([{id: 1}, {id: 2},{id: 3}]), [1, 2, 3]);
    test.deepEqual(g3.utils.getIds([1, 2, 3]), [1, 2, 3]);

    test.end();
});
