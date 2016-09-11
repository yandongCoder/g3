import getAbsUrl from "../../utils/getAbsUrl";

export default function () {
    var self = this;
    var links = this._getLinksSelection().data(this.getRenderedLinks(), function (Link) { return Link.getId() });

    links.enter()
        .append('path')
        .classed('link-path', true)
        .attr('id', function(Link){ return "link-path" + Link.getId()});

    var all  = links.enter().merge(links);

    all.selectAll('path')
        .attr('d', function (Link) { var c = Link.getCoordination();  return 'M ' + c.Sx + ' ' + c.Sy + ' L ' + c.Tx + ' ' + c.Ty; })
        .style('marker-start', function (Link) { return Link.getStartArrow(); })
        .style('marker-end', function (Link) { return Link.getEndArrow(); });


    links.exit().remove();



    //绑定linkData数据到linkLabels
    var linkLabels = this._getLinksLabelSelection().data(this._links, function (Link) { return Link.getId(); });

    //按需增加新的LinkLabels(当linksData data > linkPaths element)
    linkLabels.enter().append('text')
        .style("pointer-events", "none")
        .classed('link-label', true)
        .attr('id', function (Link) { return 'link-label' + Link.getId(); })
        .append('textPath')
        .attr('xlink:href', function (Link) {  return getAbsUrl() + '#link-path' + Link.getId(); })
        .style("pointer-events", "none");


    var allLabels = linkLabels.enter().merge(linkLabels);

    allLabels.selectAll('text.link-label')
        .attr('dx', function(Link){ return Link.getTextCenter() })
        .attr('dy', 1)
        .attr('font-size', 13);

    allLabels.selectAll('textPath')
        .text(function (Link) {
            return Link.label();
        })
        //反转字体，使字体总是朝上，该句放于该函数最后执行，提前会导致问题
        .attr('transform', function(Link){ return Link.getLinkLabelTransform(self._getCurrentScale()); });


    linkLabels.exit().remove();
}