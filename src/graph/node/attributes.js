function attr(prop, val){
    if(val === undefined) return this["_" + prop];
    
    this["_" + prop] = val;
    this.graph.delayRender(this);
    
    return this;
}

function grouped(grouped) {
    if(!arguments.length) return this._grouped === undefined? false : this._grouped;
    
    this._grouped = grouped;
    
    return this;
}

function transformed(transformed) {
    if(!arguments.length) return this._transformed || false;
    
    this._transformed = transformed;
    
    return this;
}

function getX() {
    return this.x;
}

function getY() {
    return this.y;
}

export {attr, grouped, transformed, getX, getY};