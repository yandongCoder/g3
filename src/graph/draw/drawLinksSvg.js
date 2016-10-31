import getAbsUrl from "../../utils/getAbsUrl";
import DRAWTYPE from "./DRAWTYPE";

export default function (drawType) {
    var self = this;

    // if(drawType === DRAWTYPE.NUDGE){
    //     return;
    // }
    
    var links = this._getLinksSelection().data(this.getRenderedLinks(), function (Link) { return Link.id });

    links.enter()
        .append('path')
        .classed('link-path', true)
        .attr('id', function(Link){ return "link-path" + Link.id});

    var all  = this._getLinksSelection();

    all
        .attr('d', function (Link) { var c = Link.getCoordination();  return 'M ' + c.Sx + ' ' + c.Sy + ' L ' + c.Tx + ' ' + c.Ty; })
        .style('marker-start', function (Link) { return Link.getStartArrow(); })
        .style('marker-end', function (Link) { return Link.getEndArrow(); })
        .style('stroke-width', function(Link){ return Link.width(); })
        .style('stroke', function(Link){ return Link.color(); });


    links.exit().remove();



    //绑定linkData数据到linkLabels
    var linkLabels = this._getLinksLabelSelection().data(this._links, function (Link) { return Link.id; });

    //按需增加新的LinkLabels(当linksData data > linkPaths element)
    linkLabels.enter().append('text')
        .style("pointer-events", "none")
        .classed('link-label', true)
        .attr('id', function (Link) { return 'link-label' + Link.id; })
        //.attr('text-anchor', 'middle')
        .append('textPath')
        .attr('xlink:href', function (Link) {  return getAbsUrl() + '#link-path' + Link.id; })
        //.attr('startOffset', '50%')
        .style("pointer-events", "none");


    var allLabels = this._getLinksLabelSelection();

    allLabels
        .attr('dx', function(Link){return Link.getTextOffset(); })
        .attr('dy', 1)
        .attr('font-size', 13)
        //反转字体，使字体总是朝上，该句放于该函数最后执行，提前会导致问题
        .attr('transform', function(Link){ return Link.getLinkLabelTransform(self._getCurrentScale()); });

    allLabels.select('textPath')
        .text(function (Link) {
            return Link.label();
        });


    linkLabels.exit().remove();
}