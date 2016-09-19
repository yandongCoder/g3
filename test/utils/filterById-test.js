var tape = require("tape"),
    g3 = require("../../dist/js/g3");


tape("filter object Array by id key, only return first match", function(test){
    var array = [{id: 1},{id: 2}, {id: 3}];
    test.deepEqual(g3.utils.filterById(1, array), array[0]);
    test.deepEqual(g3.utils.filterById(3, array), array[2]);
    test.end();
});
