export default function () {
    var self = this;
    var brush = d3.brush()
        .extent([[0, 0], [3840, 2400]])
        .on('start', function () {
            if (!d3.event.selection) return; // Ignore empty selections.
            
            self._getNodesSelection().each(function (Node) {
                Node.pselected = d3.event.sourceEvent.ctrlKey && Node.selected();
            });
        })
        .on('brush', function () {
            if (!d3.event.selection) return; // Ignore empty selections.

            var extent = d3.event.selection;
            var t = self._getCurrentTransform();

            self._getNodesSelection().each(function(Node){
                Node.selected(Node.pselected ^ ( (extent[0][0] - t.x) / t.k  <= Node.getX() && Node.getX() < (extent[1][0] - t.x) / t.k  && (extent[0][1] - t.y) / t.k <= Node.getY() && Node.getY() < (extent[1][1] - t.y) / t.k ));
            });

        })
        .on('end', function () {
            if (!d3.event.selection) return; // Ignore empty selections.
            self._getBrushSelection()
                .call(brush.move, null);
        });

    brush.show = function(){
        self._getBrushSelection().style('display', 'block');
    };
    brush.hide = function(){
        self._getBrushSelection().style('display', 'none');
    };

    return brush;
}