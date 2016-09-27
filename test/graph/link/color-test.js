var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("get and set color of a Link", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}])
        .links([{id: 1, src: 1, dst: 2, color: "red"}, {id: 2, src: 2, dst: 1}]);


    test.equal(myGraph.links()[0].color(), "red");
    test.equal(myGraph.links()[1].color(), "#a1a1a1");
    myGraph.links()[0].color('#666888');
    test.equal(myGraph.links()[0].color(), "#666888");

    test.end();
});
