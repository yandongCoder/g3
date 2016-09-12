var tape = require("tape"),
    g3 = require("../../dist/js/g3");


tape("get offset coordination correctly", function(test){
    test.deepEqual(g3.utils.getOffsetCoordinate(0, 0, 100, 0, 30, 20), {Sx: 30, Sy: 0, Tx: 80, Ty: 0});

    test.deepEqual(g3.utils.getOffsetCoordinate(100, 100, 100, 300, 30, 20), {Sx: 100, Sy: 130, Tx: 100, Ty: 280});
    
    test.end();
});
