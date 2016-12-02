function transform(k, x, y, duration) {
    var transformed = d3.zoomIdentity;
    if(typeof k === "number") transformed = transformed.scale(k);
    if(typeof x === "number" && typeof y === "number") transformed = transformed.translate(x, y);
    this._getSvgSelection(duration).call(this.zoom.transform, transformed);
    
    return this;
}

function scaleTo(k, duration) {
    this.transform(k, null, null, duration);
    return this;
}

function translateBy(x, y, duration) {
    this.transform(null, x, y , duration);
    return this;
}

function focus(filter, duration){
    var Nodes = this.getNodes(filter);
    if(!Nodes.length) return;
    
    var xAccessor = function(Node){return Node.x}, yAccessor = function(Node){return Node.y};
    var minX = d3.min(Nodes, xAccessor), maxX = d3.max(Nodes, xAccessor), minY = d3.min(Nodes, yAccessor), maxY = d3.max(Nodes, yAccessor);
    var xSpan = maxX - minX, ySpan = maxY - minY;
    var xCenter = (maxX + minX) / 2, yCenter = (maxY + minY) / 2;
    var canvasW = this._canvas.width.baseVal.value,
        canvasH = this._canvas.height.baseVal.value;
    
    var xScale = canvasW / xSpan,
        yScale = canvasH / ySpan;
    
    var scale = d3.min([xScale, yScale]);
    if(scale > this._config.maxScale) scale = this._config.maxScale;
    scale = scale === Infinity? 1: scale;
    scale -= 0.1;
    
    
    var transformed = d3.zoomIdentity
        .translate(canvasW / 2, canvasH / 2)
        .scale(scale)
        .translate(-xCenter, -yCenter);
    
    this._getSvgSelection(duration || 1000).call(this.zoom.transform, transformed);
}

export {transform, scaleTo, translateBy, focus};