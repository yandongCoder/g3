var tape = require("tape"),
    jsdom = require("jsdom"),
g3 = require("../../dist/js/g3");

tape("add link to graph", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg);


    //could not add link which not has source or target in nodes
    myGraph.links([{id: 1, label: "A->B", src: 1, dst: 2,direction: 0},{id: 2, label: "C->D", src: 3, dst: 4,direction: 3}]);
    test.equal(myGraph.links().length, 0);


    myGraph.nodes([{id: 1, label: "A", x: 50, y: 50}, {id: 2, label: "A", x: 100, y: 100},{id: 2, label: "A", x: 130, y: 130}]);


    myGraph.links([{id: 1, label: "A->B", src: 1, dst: 2,direction: 0},{id: 2, label: "C->D", src: 3, dst: 4,direction: 3}]);
    test.equal(myGraph.links().length, 1);


    myGraph.nodes([{id: 3, label: "A", x: 50, y: 50}, {id: 4, label: "A", x: 100, y: 100}]);

    //could add link which has source and target in nodes
    myGraph.links({id: 3, label: "A->B", src: 3, dst: 4,direction: 0});
    test.equal(myGraph.links().length, 2);

    //could not add link which id has been in links
    myGraph.links({id: 3, label: "A->B", src: 2, dst: 4,direction: 0});
    test.equal(myGraph.links().length, 2);

    test.end();
});
