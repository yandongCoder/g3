import getAbsUrl from "../../utils/getAbsUrl";
import {RENDER_TYPE} from "../CONSTANT";

export default function (drawType) {
    if(drawType === RENDER_TYPE.NUDGE){
        var selectedNodes = this._getSelectedNodesSelection();

        selectedNodes.attr("transform", function (Node) { return "translate(" + Node.getX() + "," + Node.getY() + ")";});
        return;
    }
    var self = this;
    var nodes = this._getNodesSelection().data(this.getRenderedNodes(), function (Node) { return Node.id;});

    var g = nodes.enter().append('g')
        .each(function(Node){ Node._element = this })//reference element to Node
        .classed('node', true)
        .on('mousedown', function(Node){
            if(!d3.event.ctrlKey){
                if(Node.selected()) return;
                self.deselectNodes();
            }
            self.deselectLinks();
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
    
    
    var scale = self._getCurrentScale();
        
    all.select('.text-group')
        .attr('display', function(Node){
            return (scale < 0.8 && !Node.selected())? 'none': 'block';
        })
        .attr('width', function (Node) { return Node.getLabelWidth(); })
        .attr("height", function(Node){ return Node.radius() * scale; })
        .style("line-height", function(Node){ return Node.radius() * scale + "px"; })
        .attr("transform", function(Node){ return "translate(" + (1 + Node.radius()) + ", 0) scale(" + 1 / scale + ")"; })

        .select('div')
        .attr('title', function (Node) { return Node.label(); })
        .select('span')
        .text(function (Node) { return Node.label(); });

    nodes.exit().remove();

}