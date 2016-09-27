var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("get and set _merge property of a Link", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2}, {id: 2, src: 1, dst: 2}]);

    test.equal(myGraph.links()[0].merged(), false);
    myGraph.links()[0].merged(true);
    test.equal(myGraph.links()[0].merged(), true);
    myGraph.links()[0].merged(false);
    test.equal(myGraph.links()[0].merged(), false);

    test.end();
});
