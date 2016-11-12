var tape = require("tape"),
    jsdom = require("jsdom"),
    g3 = require("../../../dist/js/g3");


tape("links DOM should correspond _links always", function(test){
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");
    global.window = document.defaultView;

    var myGraph = g3.graph(svg);

    myGraph.nodes([{id: 1}, {id: 2},{id: 3},{id: 4}, {id: 5},{id: 6}]);
    var links = [{id: 1, src: 1, dst: 2}, {id: 2, src: 2, dst: 3}, {id: 3, src: 1, dst: 5}, {id: 4, src: 5, dst: 6}, {id: 5, src: 5, dst: 2}];
    myGraph.links(links);
    myGraph.removeLinks(1);

    myGraph.render(function(){
        test.equal(myGraph.links().length, document.querySelector('.paths').querySelectorAll('.link-path').length);
        test.equal(myGraph.links().length, document.querySelector('.link-labels').querySelectorAll('.link-label').length);

        test.end();
    });
});

tape("Link's DOM should correspond Link's property", function(test) {
    var document = jsdom.jsdom('<svg id="graph"></svg>');
    var svg = document.querySelector("#graph");

    var myGraph = g3.graph(svg)
        .nodes([{id: 1, x: 0, y: 0}, {id: 2, x: 100, y: 0}])
        .links([{id: 1, src: 1, dst: 2, label: "a", color: "#342234", selected: true}, {id: 2, src: 1, dst: 2}, {id: 3, src: 1, dst: 2}]);

    test.plan(17);

    myGraph.render(function(){
        var pathsEle = document.querySelector(".paths").querySelectorAll(".link-path"),
            labelsEle = document.querySelector(".link-labels").querySelectorAll(".link-label");
        var firstPath = pathsEle[0], secondPath = pathsEle[1], thirdPath = pathsEle[2],
            firstLabel = labelsEle[0],
            firstLink = myGraph.links()[0], secondLink = myGraph.links()[1], thirdLink = myGraph.links()[2];
            
        //width Attribute
        test.equal(firstPath.style.strokeWidth, '3');
        //label DOM
        test.equal(document.querySelector(".link-labels").querySelectorAll(".link-label")[0].textContent, "a");
        //color Attribute
        test.equal(firstPath.style.stroke, "#342234");
        //direction Attribute
        test.equal(firstPath.style.markerStart, "");
        test.notEqual(firstPath.style.markerEnd, "");
    
        firstLink.width(7);
        firstLink.label('abc');
        firstLink.color('#666888');
        firstLink.direction(2);
        secondLink.direction(3);
        thirdLink.direction(0);
        
        myGraph.render(function(){
            test.equal(firstPath.className, 'link-path selected');
            test.equal(firstPath.style.strokeWidth, '7');
            test.equal(firstLabel.textContent, "abc");
            test.equal(firstPath.style.stroke, "#666888");

            test.notEqual(firstPath.style.markerStart, "");
            test.equal(firstPath.style.markerEnd, "");


            test.notEqual(secondPath.style.markerStart, "");
            test.notEqual(secondPath.style.markerEnd, "");

            test.equal(thirdPath.style.markerStart, "");
            test.equal(thirdPath.style.markerEnd, "");
    
            secondLink._pathEle.dispatchEvent(new window.MouseEvent("mousedown"));
            myGraph.render(function(){
                test.equal(firstPath.className, 'link-path');
                test.equal(secondPath.className, 'link-path selected');
                test.end();
            });
            
        });
    });
});