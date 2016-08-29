export default function (nodes) {
    if(!arguments.length){
        return this._nodes;
    }
    this._nodes = nodes;
    return this;
}