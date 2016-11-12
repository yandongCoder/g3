var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("add Link's start arrow by direction", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2, direction: 0}, {id: 2, src: 1, dst: 2, direction: 1}, {id: 3, src: 1, dst: 2, direction: 2}, {id: 4, src: 1, dst: 2, direction: 3}]);
    
    test.equal(myGraph.links()[0].getStartArrow(), "");
    test.equal(myGraph.links()[1].getStartArrow(), "");
    test.equal(myGraph.links()[2].getStartArrow(), "url(about:blank#start-arrow)");
    test.equal(myGraph.links()[3].getStartArrow(), "url(about:blank#start-arrow)");

    test.end();
});

tape("add Link's end arrow by direction", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id: 1, src: 1, dst: 2, direction: 0}, {id: 2, src: 1, dst: 2, direction: 1}, {id: 3, src: 1, dst: 2, direction: 2}, {id: 4, src: 1, dst: 2, direction: 3}]);
    
    test.equal(myGraph.links()[0].getEndArrow(), "");
    test.equal(myGraph.links()[1].getEndArrow(), "url(about:blank#end-arrow)");
    test.equal(myGraph.links()[2].getEndArrow(), "");
    test.equal(myGraph.links()[3].getEndArrow(), "url(about:blank#end-arrow)");
    
    test.end();
});