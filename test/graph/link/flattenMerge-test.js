var tape = require("tape"),
    g3 = require("../../../dist/js/g3");

tape("If merge Links and one of them merged before (meaning has mergedBy), flattenMerge will unmerge that first, then merge them again.", function(test){
    var myGraph = g3.graph()
        .nodes([{id: 1}, {id: 2}, {id: 3}])
        .links([{id:1, src: 1, dst: 2}, {id:2, src: 1, dst: 2}, {id:3, src: 2, dst: 1}, {id:4, src: 3, dst: 2}]);

    myGraph.links()[0].merge();

    myGraph.links({id: 5, src: 1, dst: 2});
    myGraph.links()[4].merge();

    myGraph.links({id: 6, src: 1, dst: 2});
    myGraph.links()[7].flattenMerge();

    test.deepEqual(myGraph.links()[6].mergedBy, [myGraph.links()[0], myGraph.links()[1], myGraph.links()[2], myGraph.links()[4], myGraph.links()[5]]);
    test.end();

});