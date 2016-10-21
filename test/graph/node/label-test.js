var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("get and set label of a Node", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes({id: 1, label: "a"});

    test.equal(myGraph.nodes()[0].label(), "a");
    myGraph.nodes()[0].label('abc');
    test.equal(myGraph.nodes()[0].label(), "abc");

    test.end();
});
