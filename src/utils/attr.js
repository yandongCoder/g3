export default function (prop, val){
    if(val === undefined) return this[prop];
    
    val = val instanceof Function? val(this): val;
    if(val === this[prop]) return;
    this[prop] = val;
    
    // this.graph.delayRender(this);
    this.graph.render(this);

    return this;
}
