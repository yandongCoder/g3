var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("If merge Links and one of them merged before (meaning has mergedBy), flattenMerge will unmerge that first, then merge them again.", function(test){
    var myGraph = g3.graph(null, {ifRender: false})
        .nodes([{id: 1}, {id: 2}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 2, dst: 1}]);

    myGraph.links()[0].merge();

    myGraph.links({id: 3, src: 1, dst: 2});
    myGraph.getRenderedLinks()[1].merge();

    myGraph.links({id: 4, src: 1, dst: 2});
    myGraph.getRenderedLinks()[1].merge();

    myGraph.links({id: 5, src: 1, dst: 2});
    myGraph.getRenderedLinks()[1].flattenMerge();

    test.deepEqual(myGraph.links()[5].mergedBy.links, myGraph.getLinks([1,2,3,4,5]));
    test.end();

});