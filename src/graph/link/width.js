export default function (width) {
    if(!arguments.length) return this._width;

    this._width = width;
    this.graph.render();

    return this;
}