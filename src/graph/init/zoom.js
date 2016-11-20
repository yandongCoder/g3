export default function() {
    var self = this;
    return d3.zoom().scaleExtent([this._config.minScale, this._config.maxScale])
        .on('start', function () {
            self._config.onZoomStart.call(this);
        })
        .on("zoom", this._zoomed.bind(this))
        .on('end', function () {
            self._config.onZoomEnd.call(this);
        });
}

