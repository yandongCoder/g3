var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("add Link's start arrow by direction", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}])
        .links([{id: 1, src: 1, dst: 2, direction: 0, label: "a"}, {id: 2, src: 1, dst: 2, direction: 1, label: "a"}, {id: 3, src: 1, dst: 2, direction: 2, label: "a"}, {id: 4, src: 1, dst: 2, direction: 3, label: "a"}]);
    
    test.equal(myGraph.links()[0].getStartArrow(), "");
    test.equal(myGraph.links()[1].getStartArrow(), "");
    test.equal(myGraph.links()[2].getStartArrow(), "url(about:blank#start-arrow)");
    test.equal(myGraph.links()[3].getStartArrow(), "url(about:blank#start-arrow)");

    test.end();
});
