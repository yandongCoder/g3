function color(color) {
    if(!arguments.length) return this._color;

    this._color = color;
    this.graph.render();

    return this;
}

function direction(direction) {
    if(!arguments.length) return this._direction;
    
    this._direction = direction;
    this.graph.render();
    
    return this;
}

function label(label) {
    if(!arguments.length) return this._label;
    
    this._label = label;
    this.graph.render();
    
    return this;
}

function merged(merged) {
    if(!arguments.length) return this._merged === undefined? false : this._merged;
    
    this._merged = merged;
    
    return this;
}

function selected(selected) {
    if(!arguments.length) return this._selected;
    this._selected = selected;
    
    this.graph.render();
    
    return this;
}

function width(width) {
    if(!arguments.length) return this._width;
    
    this._width = width;
    this.graph.render();
    
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
export {color, direction, label, merged, selected, width, grouped, transformed};
