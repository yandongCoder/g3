import getAbsUrl from "../../utils/getAbsUrl";

export default function () {
    var self = this;
    var linkPaths = this._getLinksSelection().data(this._links, function (Link) { return Link.getId() });

    linkPaths.enter()
        .append('path')
        .classed('link-path', true)
        .attr('id', function(Link){ return "link-path" + Link.getId()})
        .attr('d', function (Link) {
            return Link.getPath(self._r, true);
        })
        .style('marker-start', function (Link) {
            return Link.getStartArrow();
        })
        .style('marker-end', function (Link) {
            return Link.getEndArrow();
        });

    //绑定linkData数据到linkLabels
    var linkLabels = this._getLinksLabelSelection().data(this._links, function (Link) { return Link.getId(); });

    //按需增加新的LinkLabels(当linksData data > linkPaths element)
    var linkTexts = linkLabels.enter().append('text')
        //.filter(function(d){
        //    return !d.hide;
        //})
        .style("pointer-events", "none")
        .classed('link-label', true)
        .attr('id', function (Link) {
            return 'link-label' + Link.getId()
        })
        .attr('dx', function(Link){ return Link.getTextCenter(Link.getPath(self._r)) })
        .attr('dy', 1)
        .attr('font-size', 13);


    //根据当前数据重新生成textPath
    linkTexts.append('textPath')
        //.filter(function(d){
        //    return !d.hide;
        //})
        .attr('xlink:href', function (Link) {
            return getAbsUrl() + '#link-path' + Link.getId();
        })
        .style("pointer-events", "none").text(function (Link) {
            return Link.getLabel();
        });



    //反转字体，使字体总是朝上，该句放于该函数最后执行，提前会导致问题
    linkTexts.attr('transform', this._transformLinksLabel.bind(this));

    linkPaths.exit().remove();
    linkLabels.exit().remove();
}