var tape = require("tape"),
    g3 = require("../../dist/js/g3");


tape("filter array by function or with id", function(test){
    var array = [{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}];

    test.deepEqual(g3.utils.filterBy(function(v){return v.id === 1;}, array)[0], array[0]);
    test.deepEqual(g3.utils.filterBy(3, array)[0], array[2]);
    test.deepEqual(g3.utils.filterBy(array[4], array)[0], array[4]);
    test.deepEqual(g3.utils.filterBy({id: 6, something: 'does not matter'}, array)[0], array[5]);
    test.deepEqual(g3.utils.filterBy([9], array), []);


    test.end();
});
