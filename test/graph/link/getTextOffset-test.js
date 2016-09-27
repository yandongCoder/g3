var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("get Link's text dx offset correctly", function(test){
    //horizontal
    var myGraph = g3.graph()
        .nodes([{id: 1, x: 0, y: 0, radius: 30}, {id: 2, x: 100, y: 0, radius: 20}])
        .links([{id: 1, src: 1, dst: 2, direction: 0, label: "a", width: 5}, {id: 2, src: 1, dst: 2, direction: 1, label: "a", width: 5}, {id: 3, src: 1, dst: 2, direction: 2, label: "a", width: 5}, {id: 4, src: 1, dst: 2, direction: 3, label: "a", width: 5}]);


    test.equal(myGraph.links()[0].getTextOffset(), 51.7);
    test.equal(myGraph.links()[1].getTextOffset(), 44.2);
    test.equal(myGraph.links()[2].getTextOffset(), 14.2);
    test.equal(myGraph.links()[3].getTextOffset(), 6.7);

    //vertical
    myGraph = g3.graph()
        .nodes([{id: 1, x: 0, y: 0, radius: 30}, {id: 2, x: 0, y: 100, radius: 20}])
        .links([{id: 1, src: 1, dst: 2, direction: 0, label: "a", width: 5}, {id: 2, src: 1, dst: 2, direction: 1, label: "a", width: 5}, {id: 3, src: 1, dst: 2, direction: 2, label: "a", width: 5}, {id: 4, src: 1, dst: 2, direction: 3, label: "a", width: 5}]);

    test.equal(myGraph.links()[0].getTextOffset(), 51.7);
    test.equal(myGraph.links()[1].getTextOffset(), 44.2);
    test.equal(myGraph.links()[2].getTextOffset(), 14.2);
    test.equal(myGraph.links()[3].getTextOffset(), 6.7);

    test.end();
});
