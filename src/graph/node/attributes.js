function attr(prop, val){
    if(val === undefined) return this[prop];
    
    this[prop] = val;
    //canvas 渲染 这个delayRender 函数会导致重绘函数延迟
    // this.graph.delayRender(this);
    this.graph.renderImmediately();


    return this;
}

function getX() {
    return this.x;
}

function getY() {
    return this.y;
}

export {attr, getX, getY};