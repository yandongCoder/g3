var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("set height, and get it back", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .height(300);

    //TODO add dom test
    test.equal(myGraph.height(), 300);


    test.end();
});
