export default function() {
    var self = this;
    return d3.zoom().scaleExtent([this._config.minScale, this._config.maxScale])
        .on('start', function () {
            self._config.onZoomStart.call(this);
        })
        .on("zoom", function(){
            self._zoomed.bind(self);
            self._config.onZoom.call(this);
        })
        .on('end', function () {
            self._config.onZoomEnd.call(this);
        });
}

