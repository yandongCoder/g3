export default function (merged) {
    if(!arguments.length) return this._merged === undefined? false : this._merged;

    this._merged = merged;
    
    return this;
}