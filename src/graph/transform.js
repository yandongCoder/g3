function transform(k, x, y, duration) {
    var transformed = d3.zoomIdentity;
    if(typeof k === "number") transformed = transformed.scale(k);
    if(typeof x === "number" && typeof y === "number") transformed = transformed.translate(x, y);
    this.svgSelection(duration).call(this.zoom.transform, transformed);
    
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
    setTimeout(function(){
        var Nodes = this.getNodes(filter);
        if(!Nodes.length) return;
    
        var xAccessor = function(Node){return Node.x}, yAccessor = function(Node){return Node.y};
        var minX = d3.min(Nodes, xAccessor), maxX = d3.max(Nodes, xAccessor), minY = d3.min(Nodes, yAccessor), maxY = d3.max(Nodes, yAccessor);
        var xSpan = maxX - minX, ySpan = maxY - minY;
        var xCenter = (maxX + minX) / 2, yCenter = (maxY + minY) / 2;
        var canvasW = this.element.getBoundingClientRect().width,
            canvasH = this.element.getBoundingClientRect().height;
    
        var xScale = canvasW / xSpan,
            yScale = canvasH / ySpan;
    
        var scale = d3.min([xScale, yScale]);
        if(scale > this._config.maxScale) scale = this._config.maxScale;
        scale = scale === Infinity? 1: scale;
        scale -= scale/5;
        
        var transformed = d3.zoomIdentity
            .translate(canvasW / 2, canvasH / 2)
            .scale(scale)
            .translate(-xCenter, -yCenter);
    
        console.log(transformed);
        this.svgSelection(duration || 10000).call(this.zoom.transform, transformed);
    }.bind(this), 0)
}

export {transform, scaleTo, translateBy, focus};