export default function() {
    return d3.zoom().scaleExtent([0.1, 2.2])
        .on('start', function () {
        })
        .on("zoom", this._zoomed.bind(this))
        .on('end', function () {
        });
}

