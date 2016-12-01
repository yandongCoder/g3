import {RENDER_TYPE} from "../CONSTANT";

export default function (renderType) {
    var self = this;
    var scale = self.getCurrentTransform().k;
    
    var links = this._getLinksSelection().data(this.getRenderedLinks(), function (Link) { return Link.id });

    var link = links.enter()
        .append('g')
        .each(function(Link){ Link._element = this })
        .classed('link', true)
        .on('mousedown', function(Link, i){
            self.deselectAll();
            Link.attr("selected", !Link.attr("selected"));
        
            self._config.onLinkMouseDown.call(this, Link, i);
        })
        .on('contextmenu', this._config.onLinkContextmenu)
        .on('mouseover', this._config.onLinkMouseover)
        .on('mouseout', this._config.onLinkMouseout);
    
    link.append('path')
        .classed('link-path', true)
        .attr('id', function(Link){ return "link-path" + Link.id});
    
    
    var info = link
        .append('svg:foreignObject')
        .classed('link-info', true)
        .append("xhtml:div")
        .classed('center', true);
    
    info.append('xhtml:span').attr('class', 'icon');
    info.append('xhtml:span').attr('class', 'text');
    
    
    link.call(updateLinkAttr);
    
    
    if(renderType === RENDER_TYPE.IMMEDIATELY){
        var updateLinks  = this._getLinksSelection();
    }else if(renderType === RENDER_TYPE.NUDGE){
        updateLinks  = d3.selectAll(this.getRelatedLinks(this.getSelectedNodes()).map(function(Link){return Link._element;}));
    }else{
        updateLinks = d3.selectAll(this.updateDOM.getLinksEle());
    }
    
    
    updateLinks.call(updateLinkAttr);
    
    this.updateDOM.clearUpdateLinks();
    
    links.exit().remove();
    
    function updateLinkAttr(selection){
        // if(renderType === RENDER_TYPE.NUDGE){
        //     selection
        //         .select('path')
        //         .attr('d', function (Link) { var c = Link.getCoordination();  return 'M ' + c.Sx + ' ' + c.Sy + ' L ' + c.Tx + ' ' + c.Ty; });
        //     return;
        // }
        selection.classed("disabled", function(Link){return Link.attr("disabled")});
        
        selection
            .select('path')
            .attr('d', function (Link) { var c = Link.getCoordination();  return 'M ' + c.Sx + ' ' + c.Sy + ' L ' + c.Tx + ' ' + c.Ty; })
            .classed("selected", function(Link){return Link.attr("selected")})
            .style('marker-start', function (Link) { return Link.getStartArrow(); })
            .style('marker-end', function (Link) { return Link.getEndArrow(); })
            .style('stroke-width', function(Link){ return Link.attr("width"); })
            .style('stroke', function(Link){ return Link.attr("color"); });
    
        // if(renderType === RENDER_TYPE.NUDGE){
        //     selection
        //         .attr('dx', function(Link){return Link.getTextOffset(); })
        //         .attr('transform', function(Link){ return Link.getLinkLabelTransform(scale); });
        //     return;
        // }
        
        var info = selection
            .select('.link-info')
            .attr('transform', function(Link){
                return Link.getLinkInfoTransform(scale);
            })
            .style('display', function(Link){
                return (scale < self._config.scaleOfHideLinkLabel)? 'none': 'block';
            })
            .attr('width', function (Link) {return Link.LineWidth(scale)})
            .attr('height', function(Link){return Link.LineHeight(scale)});
        
        info.select('.text')
            .text(function (Link) {return Link.attr("label");});
    
        info.select('.icon')
            .attr('class', function(Link){ return self._config.iconPrefix + Link.attr("icon");})
    }
}