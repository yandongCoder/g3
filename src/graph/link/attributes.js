import Node from "../node/index";

function attr(prop, val){
    if(val === undefined) return this[prop];
    
    this[prop] = val instanceof Function? val(this): val;
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

export {attr, getSourceId, getTargetId, changeSource, changeTarget};
