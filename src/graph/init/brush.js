export default function () {
    var self = this;
    var brush = d3.brush()
        .extent([[0, 0], [3840, 2400]])
        .on('start.g3Default', function () {
            if (!d3.event.selection) return; // Ignore empty selections.
            
            self.nodesSelection().each(function (Node) {
                Node.pselected = d3.event.sourceEvent.ctrlKey && Node.attr("selected");
            });
        })
        .on('brush.g3Default', function () {
            if (!d3.event.selection) return; // Ignore empty selections.

            var extent = d3.event.selection;
            var t = self.currentTransform();

            self.nodesSelection().each(function(Node){
                Node.attr("selected", !Node.attr('disabled') && Boolean(Node.pselected ^ ( (extent[0][0] - t.x) / t.k  <= Node.getX() && Node.getX() < (extent[1][0] - t.x) / t.k  && (extent[0][1] - t.y) / t.k <= Node.getY() && Node.getY() < (extent[1][1] - t.y) / t.k )));
            });
        })
        .on('end.g3Default', function () {
            if (!d3.event.selection) return; // Ignore empty selections.
            self.brushSelection()
                .call(brush.move, null);
        });

    brush.show = function(){
        self.brushSelection().style('display', 'block');
    };
    brush.hide = function(){
        self.brushSelection().style('display', 'none');
    };

    return brush;
}