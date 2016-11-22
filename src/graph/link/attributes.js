import Node from "../node/index";

function attr(prop, val){
    if(val === undefined) return this["_" + prop];
    
    this["_" + prop] = val;
    this.graph.delayRender(this);
    
    return this;
}

function changeSource(source){
    if(source instanceof Node) this.source = source;
    
    this.graph.delayRender(this);
    
    return this;
}

function changeTarget(target){
    if(target instanceof Node) this.target = target;
    
    this.graph.delayRender(this);
    
    return this;
}

function getSourceId(){
    return this.source.id;
}

function getTargetId(){
    return this.target.id;
}

function merged(merged, mergedToLink) {
    if(!arguments.length) return this._merged === undefined? false : this._merged;
    
    if(merged && mergedToLink) this.mergedTo = mergedToLink;
    else delete this.mergedTo;
    
    this._merged = merged;
    this.graph.delayRender(this);
    
    return this;
}

function grouped(grouped) {
    if(!arguments.length) return this._grouped === undefined? false : this._grouped;
    
    this._grouped = grouped;
    this.graph.delayRender(this);
    
    return this;
}

function transformed(transformed) {
    if(!arguments.length) return this._transformed || false;
    
    this._transformed = transformed;
    this.graph.delayRender(this);
    
    return this;
}
export {attr, getSourceId, getTargetId, changeSource, changeTarget, merged, grouped, transformed};
