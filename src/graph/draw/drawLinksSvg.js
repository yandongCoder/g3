import {RENDER_TYPE} from "../CONSTANT";
import unique from "../../utils/unique";

export default function (renderType) {
    var self = this;
    var scale = self.currentTransform().k;
    
    addArrowByColor();
    
    var links = this.linksSelection().data(this.getRenderedLinks(), function (Link) { return Link.id });

    var link = links.enter()
        .append('g')
        .each(function(Link){ Link.element = this })
        .classed('link', true)
        .on('mousedown', function(Link, i){
            self.getNodesOP().attr("selected", false);
            self.getLinksOP().attr("selected", false);
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
        var updateLinks  = this.linksSelection();
    }else if(renderType === RENDER_TYPE.NUDGE){
        updateLinks  = d3.selectAll(this.getRelatedLinks(this.getSelectedNodes()).map(function(Link){return Link.element;}));
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
    
    function addArrowByColor(){
        var uniqueColor = unique(self.getRenderedLinks().map(function(Link){return Link.color;}));
        var startArrow = self.svgSelection().select('defs').selectAll('marker.color-start-arrow').data(uniqueColor, function(v){return v;});
        var endArrow = self.svgSelection().select('defs').selectAll('marker.color-end-arrow').data(uniqueColor, function(v){return v;});
    
        startArrow.enter()
            .append("svg:marker")
            .attr("id", function(v){ return "start-arrow-"+ v; })
            .classed('color-start-arrow', true)
            .attr("refX", 10)
            .call(arrowAttr)
            .append("svg:path")
            .attr("d", "M10,-5L0,0L10,5")
            .call(arrowPathAttr);
    
        endArrow.enter()
            .append("svg:marker")
            .attr("id", function(v){ return "end-arrow-"+ v; })
            .attr("refX", 0)
            .classed('color-end-arrow', true)
            .call(arrowAttr)
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5")
            .call(arrowPathAttr);
    
        function arrowAttr(selection){
            selection
                .attr("viewBox", "0 -5 10 10")
                .attr("markerWidth", 3)
                .attr("markerHeight", 3)
                .attr("orient", "auto");
        }
        function arrowPathAttr(selection){
            selection
                .style("fill", function(v){return v});
        }
    }
}
