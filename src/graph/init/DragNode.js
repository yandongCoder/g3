export default function () {
    var self = this;
    var drag = d3.drag()
        .on("start", function (Node) {
            d3.event.sourceEvent.stopPropagation();
        })
        .on("drag", function (Node) {
            Node.nudge(d3.event.dx, d3.event.dy);
            self.render();
        }).on("end", function (Node) {

        });
    return drag;
}