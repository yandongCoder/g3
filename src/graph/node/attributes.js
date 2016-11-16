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

function grouped(grouped) {
    if(!arguments.length) return this._grouped === undefined? false : this._grouped;
    
    this._grouped = grouped;
    
    return this;
}

function label(label) {
    if(!arguments.length) return this._label || "";
    
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

function radius(radius) {
    if(!arguments.length) return this._radius;
    
    this._radius = radius;
    this.graph.delayRender(this);
    
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

export {color, disabled, icon, mugshot, grouped, label, selected, radius, transformed, getX, getY};