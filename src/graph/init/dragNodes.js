export default function () {
    var self = this;
    var drag = d3.drag()
        .on("start.g3Default", function (Node) {
            d3.event.sourceEvent.stopPropagation();
        })
        .on("drag.g3Default", this.draged.bind(this))
        .on("end.g3Default", function (Node) {

        });
    return drag;
}