import getAbsUrl from "../../utils/getAbsUrl";
import {RENDER_TYPE} from "../CONSTANT";

export default function (renderType) {
    var self = this;
    var scale = self._getCurrentScale();
    
    var linkPaths = this._getLinksSelection().data(this.getRenderedLinks(), function (Link) { return Link.id }),
        linkLabels = this._getLinksLabelSelection().data(this._links, function (Link) { return Link.id; });

    linkPaths.enter()
        .append('path')
        .classed('link-path', true)
        .each(function(Link){ Link._pathEle = this })
        .attr('id', function(Link){ return "link-path" + Link.id})
        .on('mousedown', function(Link, i){
            self.deselectAll();
            Link.selected(!Link.selected());
            
            self._config.onLinkMouseDown.call(this, Link, i);
        })
        .on('contextmenu', this._config.onLinkContextmenu)
        .on('mouseover', this._config.onLinkMouseover)
        .on('mouseout', this._config.onLinkMouseout)
        .call(updatePathAttr);
    
    var text = linkLabels.enter().append('text')
        .each(function(Link){ Link._labelEle = this })
        .style("pointer-events", "none")
        .classed('link-label', true)
        .attr('id', function (Link) { return 'link-label' + Link.id; });
    text.append('textPath')
        .attr('xlink:href', function (Link) {  return getAbsUrl() + '#link-path' + Link.id; })
        .style("pointer-events", "none");
    
    text.call(updateLabelAttr);
    
    if(renderType === RENDER_TYPE.IMMEDIATELY || renderType === RENDER_TYPE.NUDGE){
        var updateLinks  = this._getLinksSelection(),
            updateLabels = this._getLinksLabelSelection();
    }else{
        updateLinks = d3.selectAll(this.updateDOM.getLinksPath());
        updateLabels = d3.selectAll(this.updateDOM.getLinksLabel());
    }

    updateLinks.call(updatePathAttr);
    updateLabels.call(updateLabelAttr);
    
    this.updateDOM.clearUpdateLinks();
    
    linkPaths.exit().remove();
    linkLabels.exit().remove();
    
    function updatePathAttr(selection){
        if(renderType === RENDER_TYPE.NUDGE){
            selection.attr('d', function (Link) { var c = Link.getCoordination();  return 'M ' + c.Sx + ' ' + c.Sy + ' L ' + c.Tx + ' ' + c.Ty; });
            return;
        }
        selection
            .attr('d', function (Link) { var c = Link.getCoordination();  return 'M ' + c.Sx + ' ' + c.Sy + ' L ' + c.Tx + ' ' + c.Ty; })
            .classed("selected", function(Link){return Link.selected()})
            .classed("disabled", function(Node){return Node.disabled()})
            .style('marker-start', function (Link) { return Link.getStartArrow(); })
            .style('marker-end', function (Link) { return Link.getEndArrow(); })
            .style('stroke-width', function(Link){ return Link.width(); })
            .style('stroke', function(Link){ return Link.color(); });
    }
    
    function updateLabelAttr(selection){
        if(renderType === RENDER_TYPE.NUDGE){
            selection
                .attr('dx', function(Link){return Link.getTextOffset(); })
                .attr('transform', function(Link){ return Link.getLinkLabelTransform(scale); });
            return;
        }
        selection
            .style('display', function(Link){
                return (scale < self._config.scaleOfHideLabel)? 'none': 'block';
            })
            .classed("disabled", function(Node){return Node.disabled()})
            .attr('dx', function(Link){return Link.getTextOffset(); })
            .attr('dy', 1)
            .attr('font-size', 13)
            //反转字体，使字体总是朝上，该句放于该函数最后执行，提前会导致问题
            .attr('transform', function(Link){ return Link.getLinkLabelTransform(scale); });
    
        selection.select('textPath')
            .text(function (Link) {
                return Link.label();
            });
    }
}