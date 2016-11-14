import getAbsUrl from "../../utils/getAbsUrl";
import {RENDER_TYPE} from "../CONSTANT";

export default function (drawType) {
    var self = this;
    
    var links = this._getLinksSelection().data(this.getRenderedLinks(), function (Link) { return Link.id });

    links.enter()
        .append('path')
        .classed('link-path', true)
        .each(function(Link){ Link._pathEle = this })
        .attr('id', function(Link){ return "link-path" + Link.id})
        .on('mousedown', function(Link, i){
            self.deselectLinks()
                .deselectNodes();
            Link.selected(!Link.selected());
            
            self.config.onLinkMouseDown.call(this, Link, i);
        })
        .on('contextmenu', this.config.onLinkContextmenu);
    
    if(drawType === RENDER_TYPE.NUDGE){
        var selectedNodes = this.getSelectedNodes();
        var attachedLinks = this.getRelatedLinks(selectedNodes);
        var attachedLinksEle = attachedLinks.map(function(Link){return Link._pathEle});
    
        var changedLinks = d3.selectAll(attachedLinksEle);
    }else{
        changedLinks  = this._getLinksSelection();
    }

    changedLinks
        .attr('d', function (Link) { var c = Link.getCoordination();  return 'M ' + c.Sx + ' ' + c.Sy + ' L ' + c.Tx + ' ' + c.Ty; })
        .classed("selected", function(Link){return Link.selected()})
        .style('marker-start', function (Link) { return Link.getStartArrow(); })
        .style('marker-end', function (Link) { return Link.getEndArrow(); })
        .style('stroke-width', function(Link){ return Link.width(); })
        .style('stroke', function(Link){ return Link.color(); });


    links.exit().remove();
    

    //绑定linkData数据到linkLabels
    var linkLabels = this._getLinksLabelSelection().data(this._links, function (Link) { return Link.id; });

    //按需增加新的LinkLabels(当linksData data > linkPaths element)
    linkLabels.enter().append('text')
        .each(function(Link){ Link._labelEle = this })
        .style("pointer-events", "none")
        .classed('link-label', true)
        .attr('id', function (Link) { return 'link-label' + Link.id; })
        //.attr('text-anchor', 'middle')
        .append('textPath')
        .attr('xlink:href', function (Link) {  return getAbsUrl() + '#link-path' + Link.id; })
        //.attr('startOffset', '50%')
        .style("pointer-events", "none");
    
    
    if(drawType === RENDER_TYPE.NUDGE){
        var attachedLinkLabels = attachedLinks.map(function(Link){return Link._labelEle});
        
        var allLabels = d3.selectAll(attachedLinkLabels);
        
    }else{
        allLabels = this._getLinksLabelSelection();
    }
    
    var scale = self._getCurrentScale();
    allLabels
        .style('display', function(Link){
            return (scale < self.config.scaleOfHideLabel)? 'none': 'block';
        })
        .attr('dx', function(Link){return Link.getTextOffset(); })
        .attr('dy', 1)
        .attr('font-size', 13)
        //反转字体，使字体总是朝上，该句放于该函数最后执行，提前会导致问题
        .attr('transform', function(Link){ return Link.getLinkLabelTransform(scale); });

    allLabels.select('textPath')
        .text(function (Link) {
            return Link.label();
        });


    linkLabels.exit().remove();
}