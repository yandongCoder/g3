var tape = require("tape"),
    g3 = require("../../dist/js/g3");


tape("set width, and get it back", function(test){
    var myGraph = g3.graph()
        .width(100);
    //TODO add new test
    test.equal(myGraph.width(), 100);

    test.end();
});
