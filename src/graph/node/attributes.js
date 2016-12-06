function attr(prop, val){
    if(val === undefined) return this[prop];
    
    this[prop] = val;
    this.graph.delayRender(this);
    
    return this;
}

function getX() {
    return this.x || 0;
}

function getY() {
    return this.y || 0;
}

export {attr, getX, getY};