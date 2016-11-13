export default function() {
    return d3.zoom().scaleExtent([this.config.minScale, this.config.maxScale])
        .on('start', function () {
        })
        .on("zoom", this._zoomed.bind(this))
        .on('end', function () {
        });
}

