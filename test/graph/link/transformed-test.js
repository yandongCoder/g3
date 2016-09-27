var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Transform Link should mark this Link's _transform true.", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}]);


    test.equal(myGraph.links()[0].transformed(), false);
    myGraph.links()[0].transformed(true);
    test.equal(myGraph.links()[0]._transformed, true);

    test.end();
});
