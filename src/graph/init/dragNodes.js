export default function () {
    var self = this;
    var drag = d3.drag()
        .on("start", function (Node) {
            d3.event.sourceEvent.stopPropagation();
        })
        .on("drag", this.draged.bind(this))
        .on("end", function (Node) {

        });
    return drag;
}