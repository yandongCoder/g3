import getAbsUrl from "../../utils/getAbsUrl";
import DRAWTYPE from "./DRAWTYPE";

export default function (drawType) {
    // if(drawType === DRAWTYPE.NUDGE){
    //     //Enter and Update
    //     var all = this._getNodesSelection();
    //
    //     all.attr("transform", function (Node) { return "translate(" + Node.getX() + "," + Node.getY() + ")";})
    //         .classed("selected", function(Node){return Node.selected()});
    //     return;
    // }
    var self = this;
    var nodes = this._getNodesSelection().data(this.getRenderedNodes(), function (Node) { return Node.id;});

    var previousPosition = [];

    var g = nodes.enter().append('g')
        .each(function(Node){ Node._element = this })//reference element to Node
        .classed('node', true)
        .on('click', function(Node){
            if(!d3.event.ctrlKey) self.unselectNodes();
            Node.selected(!Node.selected());
        })
        .call(this.dragNode);

    //添加矩形
    g.append("circle")
        .attr("filter", "url(" + getAbsUrl() + "#shadow)");
    g.append('svg:foreignObject')
        .attr('class', 'text-group')
        .append("xhtml:div")
        .append('xhtml:span');

    //Enter and Update
    var all = this._getNodesSelection();

    all.attr("transform", function (Node) { return "translate(" + Node.getX() + "," + Node.getY() + ")";})
        .classed("selected", function(Node){return Node.selected()});

    all.select('circle')
        .attr("r", function(Node){ return Node.radius()})
        .style("fill", function(Node){ return Node.color() });
    

    all.select('.text-group')
        .attr('width', function (Node) { return Node.getLabelWidth(); })
        .attr("height", function(Node){ return Node.radius() * self._getCurrentScale(); })
        .style("line-height", function(Node){ return Node.radius() * self._getCurrentScale() + "px"; })
        .attr("transform", function(Node){ return "translate(" + (1 + Node.radius()) + ", 0) scale(" + 1 / self._getCurrentScale()+ ")"; })

        .select('div')
        .attr('title', function (Node) { return Node.label(); })
        .select('span')
        .text(function (Node) { return Node.label(); });

    nodes.exit().remove();

}