export default function () {
    var self = this;
    var linkPaths = d3.select('.paths').selectAll('path').data(this._links, function (d) {
        return d.id;
    });

    linkPaths.enter()
        .append('path')
        .classed('link-path', true)
        .attr('d', function (Link) {
            return Link.getPath(self._r)
        })
        .style('marker-start', function (Link) {
            return Link.getStartArrow();
        })
        .style('marker-end', function (Link) {
            return Link.getEndArrow();
        });
}