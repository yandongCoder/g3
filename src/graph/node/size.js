export default function (diameter) {
    if(!arguments.length) return this._size;

    this._size = diameter;
    graph.render();

    return this;
}