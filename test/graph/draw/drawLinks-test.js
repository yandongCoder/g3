var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3"),
    d3 = require("d3");


tape("links DOM should correspond _links always", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    global.window = document.defaultView;

    var myGraph = g3.graph(svg);

    myGraph.nodes([{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}]);
    var links = [{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 1, dst: 5}, {id: 4, src: 5, dst: 6}, {id: 5, src: 5, dst: 2}];
    myGraph.links(links);

    test.equal(myGraph.links().length, document.querySelector('.paths').querySelectorAll('.link-path').length);
    test.equal(myGraph.links().length, document.querySelector('.link-labels').querySelectorAll('.link-label').length);
    //by Id
    myGraph.removeLinks(1);
    test.equal(myGraph.links().length, document.querySelector('.paths').querySelectorAll('.link-path').length);
    test.equal(myGraph.links().length, document.querySelector('.link-labels').querySelectorAll('.link-label').length);

    //by Link
    myGraph.removeLinks(links[1]);
    test.equal(myGraph.links().length, document.querySelector('.paths').querySelectorAll('.link-path').length);
    test.equal(myGraph.links().length, document.querySelector('.link-labels').querySelectorAll('.link-label').length);

    //by Id array
    myGraph.removeLinks([3]);
    test.equal(myGraph.links().length, document.querySelector('.paths').querySelectorAll('.link-path').length);
    test.equal(myGraph.links().length, document.querySelector('.link-labels').querySelectorAll('.link-label').length);

    //by Id obj
    myGraph.removeLinks({id: 4});
    test.equal(myGraph.links().length, document.querySelector('.paths').querySelectorAll('.link-path').length);
    test.equal(myGraph.links().length, document.querySelector('.link-labels').querySelectorAll('.link-label').length);

    //by Id obj Array
    myGraph.removeLinks({id: 5});
    test.equal(myGraph.links().length, document.querySelector('.paths').querySelectorAll('.link-path').length);
    test.equal(myGraph.links().length, document.querySelector('.link-labels').querySelectorAll('.link-label').length);
    
    test.end();
});