export default function (diameter) {
    if(!arguments.length) return this._size;

    this._size = diameter;
    this.graph.render();

    return this;
}