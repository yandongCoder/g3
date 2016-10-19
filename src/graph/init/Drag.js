export default function () {
    var self = this;
    var drag = d3.drag()
        .container(this._canvas)
        .subject(function(){
            return self.getRenderedNodes()[2];
        })
        .on("start", function (Node) {
            d3.event.sourceEvent.stopPropagation();
        })
        .on("drag", function () {
            d3.event.subject.nudge(d3.event.dx, d3.event.dy);
        }).on("end", function (Node) {

        });
    return drag;
}
