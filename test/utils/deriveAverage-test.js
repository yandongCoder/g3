var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape('get average number of a property of a objectArray', function(test){
    var objArray = [{id: 1, width: 5}, {id: 2, width: 5}, {id: 3, width: 11}];

    test.equal(g3.utils.average('width', objArray), 7);
    test.end();
});