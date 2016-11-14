var tape = require("tape"),
    g3 = require("../../dist/js/g3");


tape("pickIds will return id array of object array", function(test){
    var array = [{id: 1, foo: 'bar'}, {id: 2, bar: 'foo'}];
    
    test.deepEqual(g3.utils.pickIds(array), [1, 2]);
    
    test.end();
});
