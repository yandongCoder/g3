export default function() {
    var self = this;
    var downPosition = null;
    return d3.zoom().scaleExtent([this._config.minScale, this._config.maxScale])
        .on('start.g3Default', function () {
            if(!d3.event.sourceEvent) return;
            downPosition = [d3.event.sourceEvent.x, d3.event.sourceEvent.y];
        })
        .on("zoom.g3Default", this._zoomed.bind(this))
        .on('end.g3Default', function () {
            if(!d3.event.sourceEvent) return;
            if(downPosition[0] === d3.event.sourceEvent.x && downPosition[1] === d3.event.sourceEvent.y && d3.event.sourceEvent.target.nodeName === 'svg'){
                d3.event.sourceEvent.target.dispatchEvent(new Event('click'));
            }
        });
}

