var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape('concat property of a objectArray', function(test){
    var objArray = [{id: 1, label: "a"}, {id: 2, label: "b"}, {id: 3, label: "c"}];

    test.equal(g3.utils.concat('id', objArray), "1&2&3");
    test.equal(g3.utils.concat('label', objArray), "a&b&c");
    test.end();
});