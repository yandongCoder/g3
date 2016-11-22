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
                if(Node.attr("selected")) return;
                self.deselectNodes();
            }
            self.deselectLinks();
            Node.attr("selected",!Node.attr("selected"));
            
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
            .classed("selected", function(Node){return Node.attr("selected")})
            .classed("disabled", function(Node){return Node.attr("disabled")});
        
        selection.select('circle')
            .attr("r", function(Node){ return Node.attr("radius");})
            .style("fill", function(Node){ return Node.attr("color"); });
        
        selection.selectAll('.icon, .mugshot')
            .attr("transform", function(Node){ return "translate(" + -Node.attr("radius") + ", "+ -Node.attr("radius") +")"; })
            .attr("width", function(Node){return Node.attr("radius")*2;})
            .attr("height", function(Node){return Node.attr("radius")*2;});
        
        selection.select('.icon').select('span')
            .attr('class', function(Node){ return self._config.iconPrefix + Node.attr("icon");})
            .style("line-height", function(Node){return Node.attr("radius")*2 + "px";});
        selection.select('.mugshot').select('img')
            .attr('src', function(Node){return Node.attr("mugshot")? self._config.mugshotPrefix + Node.attr("mugshot"): "";})
            .style('display', function(Node){return Node.attr("mugshot")? "block": "none";});
        
        selection.select('.text-group')
            .style('display', function(Node){
                return (scale < self._config.scaleOfHideLabel)? 'none': 'block';
            })
            .attr('width', function (Node) { return Node.getLabelWidth(); })
            .attr("height", function(Node){ return Node.attr("radius") * scale; })
            .style("line-height", function(Node){ return Node.attr("radius") * scale + "px"; })
            .attr("transform", function(Node){ return "translate(" + (1 + Node.attr("radius")) + ", 0) scale(" + 1 / scale + ")"; })
            
            .select('div')
            .attr('title', function (Node) { return Node.attr("label"); })
            .select('span')
            .text(function (Node) { return Node.attr("label"); });
    }
}