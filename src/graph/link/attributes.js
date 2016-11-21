import Node from "../node/index";

function color(color) {
    if(!arguments.length) return this._color;

    this._color = color;
    this.graph.delayRender(this);

    return this;
}

function disabled(disabled) {
    if(!arguments.length) return this._disabled;
    
    this._disabled = disabled;
    this.graph.delayRender(this);
    
    return this;
}

function icon(icon) {
    if(!arguments.length) return this._icon;
    
    this._icon = icon;
    this.graph.delayRender(this);
    
    return this;
}

function mugshot(mugshot) {
    if(!arguments.length) return this._mugshot;
    
    this._mugshot = mugshot;
    this.graph.delayRender(this);
    
    return this;
}

function direction(direction) {
    if(!arguments.length) return this._direction;
    
    this._direction = direction;
    this.graph.delayRender(this);
    
    return this;
}

function label(label) {
    if(!arguments.length) return this._label;
    
    this._label = label;
    this.graph.delayRender(this);
    
    return this;
}

function selected(selected) {
    if(!arguments.length) return this._selected;
    this._selected = selected;
    
    this.graph.delayRender(this);
    
    return this;
}

function width(width) {
    if(!arguments.length) return this._width;
    
    this._width = width;
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
export {color, disabled, icon, mugshot, direction, label, selected, width, getSourceId, getTargetId, changeSource, changeTarget, merged, grouped, transformed};
