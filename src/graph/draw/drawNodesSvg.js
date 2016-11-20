import getAbsUrl from "../../utils/getAbsUrl";
import {RENDER_TYPE} from "../CONSTANT";

export default function (renderType) {
 
    var self = this;
    var nodes = this._getNodesSelection().data(this.getRenderedNodes(), function (Node) { return Node.id;});

    var g = nodes.enter().append('g')
        .each(function(Node){ Node._element = this })//reference element to Node
        .classed('node', true)
        .on('mousedown', function(Node, i){
            if(!d3.event.ctrlKey){
                if(Node.selected()) return;
                self.deselectNodes();
            }
            self.deselectLinks();
            Node.selected(!Node.selected());
            
            self._config.onNodeMouseDown.call(this, Node, i);
        })
        .on('contextmenu', this._config.onNodeContextmenu)
        .on('mouseover', this._config.onNodeMouseover)
        .on('mouseout', this._config.onNodeMouseout)
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
    g.call(updateAttr);
    
    //need update Nodes Element
    if(renderType === RENDER_TYPE.IMMEDIATELY){
        var updateNodes = this._getNodesSelection();
    }else{
        updateNodes = d3.selectAll(this.updateDOM.getNodesEle());
    }
    updateNodes.call(updateAttr);
    
    this.updateDOM.clearUpdateNodes();
    
    nodes.exit().remove();
    
    function updateAttr(selection){
        var scale = self.getCurrentTransform().k;
        
        selection.attr("transform", function (Node) { return "translate(" + Node.getX() + "," + Node.getY() + ")";})
            .classed("selected", function(Node){return Node.selected()})
            .classed("disabled", function(Node){return Node.disabled()});
        
        selection.select('circle')
            .attr("r", function(Node){ return Node.radius();})
            .style("fill", function(Node){ return Node.color(); });
        
        selection.selectAll('.icon, .mugshot')
            .attr("transform", function(Node){ return "translate(" + -Node.radius() + ", "+ -Node.radius() +")"; })
            .attr("width", function(Node){return Node.radius()*2;})
            .attr("height", function(Node){return Node.radius()*2;});
        
        selection.select('.icon').select('span')
            .attr('class', function(Node){ return self._config.iconPrefix + Node.icon();})
            .style("line-height", function(Node){return Node.radius()*2 + "px";});
        selection.select('.mugshot').select('img')
            .attr('src', function(Node){return Node.mugshot()? self._config.mugshotPrefix + Node.mugshot(): "";})
            .style('display', function(Node){return Node.mugshot()? "block": "none";});
        
        selection.select('.text-group')
            .style('display', function(Node){
                return (scale < self._config.scaleOfHideLabel)? 'none': 'block';
            })
            .attr('width', function (Node) { return Node.getLabelWidth(); })
            .attr("height", function(Node){ return Node.radius() * scale; })
            .style("line-height", function(Node){ return Node.radius() * scale + "px"; })
            .attr("transform", function(Node){ return "translate(" + (1 + Node.radius()) + ", 0) scale(" + 1 / scale + ")"; })
            
            .select('div')
            .attr('title', function (Node) { return Node.label(); })
            .select('span')
            .text(function (Node) { return Node.label(); });
    }
}