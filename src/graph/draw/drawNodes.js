import getAbsUrl from "../../utils/getAbsUrl";

export default function () {
    var nodes = this._getNodesSelection().data(this._nodes, function (d) {
        return d.id;
    });

    var g = nodes.enter().append('g')
        .attr("transform", function (node) {
            return node.getTranslate();
        })
        .classed('node', true);
    
    //添加矩形
    g.append("rect")
        .attr("width", this._r)
        .attr("height", this._r)
        .attr("filter", "url(" + getAbsUrl() + "#shadow)")
        .style("fill", function(Node){ return Node.getColor() });


    var textGroup = g.append('svg:foreignObject')
        .attr('class', 'text-group')
        .attr('width', function (Node) {
            return Node.getLabelWidth();
        })
        .attr("height", this._r)
        .style("line-height", this._r + 'px')
        .attr('transform', "translate(" + (1 + this._r) + ", 0)");

    textGroup.append("xhtml:div")
        .attr('title', function (Node) {
            return Node.getLabel();
        })
        .append('xhtml:span')
        .text(function (Node) {
            return Node.getLabel();
        });

    nodes.exit().remove();
}