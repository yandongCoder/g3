function attr(prop, val){
    if(val === undefined) return this[prop];
    
    this[prop] = val;
    this.graph.delayRender(this);
    
    return this;
}

function getX() {
    return this.x;
}

function getY() {
    return this.y;
}

export {attr, getX, getY};