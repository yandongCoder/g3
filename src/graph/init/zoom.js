export default function() {
    var self = this;
    return d3.zoom().scaleExtent([this._config.minScale, this._config.maxScale])
        .on('start.g3Default', function () {
        })
        .on("zoom.g3Default", this._zoomed.bind(this))
        .on('end.g3Default', function () {
        });
}

