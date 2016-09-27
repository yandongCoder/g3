var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("get and set label of a Link", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}])
        .links([{id: 1, src: 1, dst: 2, label: "a"}, {id: 2, src: 1, dst: 2, label: "b"}, {id: 3, src: 1, dst: 2}]);
    
    test.equal(myGraph.links()[0].label(), "a");
    test.equal(myGraph.links()[1].label(), "b");
    test.equal(myGraph.links()[2].label(), "");

    myGraph.links()[0].label('abc');
    test.equal(myGraph.links()[0].label(), "abc");



    test.end();
});
