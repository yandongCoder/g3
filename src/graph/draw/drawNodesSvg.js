import getAbsUrl from "../../utils/getAbsUrl";
import {RENDER_TYPE} from "../CONSTANT";

export default function (drawType) {
 
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
    g.append('svg:foreignObject')
        .attr('class', 'icon')
        .append('xhtml:span');
    g.append('svg:foreignObject')
        .attr('class', 'mugshot')
        .append('xhtml:img');

    //Enter and Update
    if(drawType === RENDER_TYPE.NUDGE){
        var selectedNodeEle = this.getSelectedNodes().map(function(Node){return Node._element;});
        var all = d3.selectAll(selectedNodeEle);
    }else{
        all = this._getNodesSelection();
    }
    
    var scale = self._getCurrentScale();

    all.attr("transform", function (Node) { return "translate(" + Node.getX() + "," + Node.getY() + ")";})
        .classed("selected", function(Node){return Node.selected()});

    all.select('circle')
        .attr("r", function(Node){ return Node.radius();})
        .style("fill", function(Node){ return Node.color(); });

    all.selectAll('.icon, .mugshot')
        .attr("transform", function(Node){ return "translate(" + -Node.radius() + ", "+ -Node.radius() +")"; })
        .attr("width", function(Node){return Node.radius()*2;})
        .attr("height", function(Node){return Node.radius()*2;});
    
    all.select('.icon').select('span')
        .attr('class', function(Node){ return self.config.iconPrefix + Node.icon();})
        .style("line-height", function(Node){return Node.radius()*2 + "px";});
    all.select('.mugshot').select('img')
        .attr('src', function(Node){return self.config.mugshotPrefix + Node.mugshot();});
        
    all.select('.text-group')
        .style('display', function(Node){
            return (scale < self.config.scaleOfHideLabel)? 'none': 'block';
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