var tape = require("tape"),
    g3 = require("../../dist/js/g3");

tape("remove link by Link or LinkId", function(test){
    var myGraph = g3.graph(null, {ifRender: false});


    myGraph.nodes([{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}]);
    var links = [{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 1, dst: 5}, {id: 4, src: 5, dst: 6}, {id: 5, src: 5, dst: 2}];
    myGraph.links(links);

    test.equal(myGraph.links().length, 5);
    //by Id
    myGraph.removeLinks(1);
    test.equal(myGraph.links().length, 4);
    test.equal(getLinkLenById(1), 0);

    //by Link
    myGraph.removeLinks(links[1]);
    test.equal(myGraph.links().length, 3);
    test.equal(getLinkLenById(2), 0);

    //by Id array
    myGraph.removeLinks([3]);
    test.equal(myGraph.links().length, 2);
    test.equal(getLinkLenById(3), 0);

    //by Id obj
    myGraph.removeLinks({id: 4});
    test.equal(myGraph.links().length, 1);
    test.equal(getLinkLenById(4), 0);

    //by Id obj Array
    myGraph.removeLinks({id: 5});
    test.equal(myGraph.links().length, 0);
    test.equal(getLinkLenById(5), 0);
    test.end();

    function getLinkLenById (id){
        return myGraph.links().filter(function(Link){ return Link.id === id }).length;
    }
});