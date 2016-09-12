import getAbsUrl from "../../utils/getAbsUrl";

export default function () {
    var self = this;
    var nodes = this._getNodesSelection().data(this.getRenderedNodes(), function (d) { return d.id;});

    var g = nodes.enter().append('g')
        .each(function(Node){ Node._element = this })//reference element to Node
        .classed('node', true)
        .call(this.dragNode);

    //添加矩形
    g.append("rect")
        .attr("filter", "url(" + getAbsUrl() + "#shadow)")
        .classed("circle", true);
    g.append('svg:foreignObject')
        .attr('class', 'text-group')
        .append("xhtml:div")
        .append('xhtml:span');

    //Enter and Update
    var all = this._getNodesSelection();

    all.attr("transform", function (Node) { return Node.getTranslate(); });

    all.select('rect')
        .attr("width", function(Node){ return Node.size()})
        .attr("height", function(Node){ return Node.size()})
        .style("fill", function(Node){ return Node.color() });
    

    all.select('.text-group')
        .attr('width', function (Node) { return Node.getLabelWidth(); })
        .attr("height", function(Node){ return Node.size() * self._getCurrentScale(); })
        .style("line-height", function(Node){ return Node.size() * self._getCurrentScale() + "px"; })
        .attr("transform", function(Node){ return "translate(" + (1 + Node.size()) + ", 0) scale(" + 1 / self._getCurrentScale()+ ")"; })

        .select('div')
        .attr('title', function (Node) { return Node.label(); })
        .select('span')
        .text(function (Node) { return Node.label(); });

    nodes.exit().remove();
}