export default function (k, x, y, duration) {
    var transformed = d3.zoomIdentity;
    if(typeof k === "number") transformed = transformed.scale(k);
    if(typeof x === "number" && typeof y === "number") transformed = transformed.translate(x, y);
    this._getCanvas(duration).call(this.zoom.transform, transformed);
}