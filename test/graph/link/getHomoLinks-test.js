var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Return all Links that connected same source and target as received Link", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1}, {id: 2}, {id: 3}, {id: 4}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 2, dst: 1}, {id:3, src: 1, dst: 4}]);
    
    test.deepEqual(myGraph.links()[0].getHomoLinks(), [myGraph.links()[0], myGraph.links()[1]]);
    test.deepEqual(myGraph.links()[1].getHomoLinks(), [myGraph.links()[0], myGraph.links()[1]]);
    test.deepEqual(myGraph.links()[2].getHomoLinks(), [myGraph.links()[2]]);

    test.end();
});

tape("new Link merged by original Links also returned by getHomoLinks", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    test.equal(myGraph.links()[0].getHomoLinks().length, 3);

    myGraph.links()[0].merge();
    test.equal(myGraph.links()[0].getHomoLinks().length, 4);

    myGraph.links({id: 5, src: 1, dst: 2});
    test.equal(myGraph.links()[0].getHomoLinks().length, 5);

    myGraph.links()[4].merge();
    myGraph.links()[1].merge();//idempotent (幂等性)

    test.equal(myGraph.links()[0].getHomoLinks().length, 6);
    test.deepEqual(myGraph.links()[0].getHomoLinks(), myGraph.links()[6].getHomoLinks());

    test.end();
});