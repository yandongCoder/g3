var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("get and set direction of a Link", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}])
        .links([{id: 1, src: 1, dst: 2}]);

    test.equal(myGraph.links()[0].direction(), 1);
    myGraph.links()[0].direction(2);
    test.equal(myGraph.links()[0].direction(), 2);

    test.end();
});
