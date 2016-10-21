var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("Added link must has source and target nodes ", function(test){
    //horizontal
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}])
        .links([{id: 1, src: 1, dst: 2, direction: 0, label: "a"}, {id: 2, src: 1, dst: 3, direction: 1, label: "a"}, {id: 3, src: 2, dst: 2, direction: 2, label: "a"}, {id: 4, src: 3, dst: 2, direction: 3, label: "a"}]);


    test.equal(myGraph.links().length, 2);
    test.equal(myGraph.links()[0].hasST(), true);
    test.equal(myGraph.links()[1].hasST(), true);


    test.end();
});
