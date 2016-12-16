import getAbsUrl from "../../utils/getAbsUrl";
import {RENDER_TYPE, NODE_TEXT_HEIGHT} from "../CONSTANT";

export default function (renderType) {
 
    var self = this;
    var nodes = this.nodesSelection().data(this.getRenderedNodes(), function (Node) { return Node.id;});

    var g = nodes.enter().append('g')
        .each(function(Node){ Node.element = this })//reference element to Node
        .classed('node', true)
        .on('mousedown.select', function(Node, i){
            if(!d3.event.ctrlKey){
                if(Node.attr("selected")) return;
                self.getNodesOP().attr("selected", false);
            }
            self.getLinksOP().attr("selected", false);
            Node.attr("selected",!Node.attr("selected"));
        })
        .call(this._config.bindNodeEvent)
        .call(this.dragNode);
    
    g.append("circle")
        .attr('class', 'circle')
        .attr("filter", "url(" + getAbsUrl() + "#shadow)");
    g.append('svg:foreignObject')
        .attr('class', 'text-group')
        .append("xhtml:div")
        .attr('class', 'text');
    
    var avatar = g.append('svg:foreignObject').attr('class', 'avatar');
    avatar.append('xhtml:span').attr('class', 'icon');
    avatar.append('xhtml:img').attr('class', 'mugshot');
    
    g.call(this._config.insertNode);
    g.call(updateAttr);
    
    //update elements
    if(renderType === RENDER_TYPE.IMMEDIATELY || renderType === RENDER_TYPE.ZOOM) var updateNodes = this.nodesSelection();
    else updateNodes = d3.selectAll(this.updateDOM.getNodesEle());
    
    //update attributes
    if(renderType === RENDER_TYPE.ZOOM) var updated = updateZoom;
    else updated = updateAttr;
    
    updateNodes.call(updated);
    
    
    this.updateDOM.clearUpdateNodes();
    nodes.exit().remove();
    
    
    function updateZoom(selection){
        var scale = self.currentTransform().k;
        selection.attr("transform", function (Node) { return "translate(" + Node.getX() + "," + Node.getY() + ")";});

        selection.select('.text-group')
            .style('display', function(Node){
                return (scale < self._config.scaleOfHideNodeLabel)? 'none': 'block';
            })
            .attr("transform", function(Node){ return "translate(" + (1 + Node.attr("radius")) + ", "+ (-NODE_TEXT_HEIGHT / scale) +") scale(" + 1 / scale + ")"; })
        
        
        selection.call(self._config.updateNode, scale);
    }
    
    function updateAttr(selection){
        var scale = self.currentTransform().k;
        selection.attr("transform", function (Node) { return "translate(" + Node.getX() + "," + Node.getY() + ")";})
            .classed("selected", function(Node){return Node.attr("selected")})
            .classed("disabled", function(Node){return Node.attr("disabled")});
        
        selection.select('circle')
            .attr("r", function(Node){ return Node.attr("radius");})
            .style("fill", function(Node){ return Node.attr("color"); });
        
        var avatar = selection.selectAll('.avatar')
            .attr("transform", function(Node){ return "translate(" + -Node.attr("radius") + ", "+ -Node.attr("radius") +")"; })
            .attr("width", function(Node){return Node.attr("radius")*2;})
            .attr("height", function(Node){return Node.attr("radius")*2;});
    
        avatar.select('.icon')
            .attr('class', function(Node){ return "icon " + self._config.iconPrefix + Node.attr("icon");})
            .style("line-height", function(Node){return Node.attr("radius")*2 + "px";});
        
        avatar.select('.mugshot')
            .attr('src', function(Node){return Node.attr("mugshot")? self._config.mugshotPrefix + Node.attr("mugshot"): "";})
            .style('display', function(Node){return Node.attr("mugshot")? "block": "none";});
        
        selection.select('.text-group')
            .style('display', function(Node){
                return (scale < self._config.scaleOfHideNodeLabel)? 'none': 'block';
            })
            .style("width", self._config.nodeLabelClipWidth + "px")
            .attr("transform", function(Node){ return "translate(" + (1 + Node.attr("radius")) + ", "+ (-NODE_TEXT_HEIGHT / scale) +") scale(" + 1 / scale + ")"; })
            
            .select('.text')
            .text(function (Node) { return Node.attr("label"); });
        
        selection.call(self._config.updateNode, scale);
    }
}