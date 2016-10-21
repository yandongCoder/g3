export default function (color) {
    if(!arguments.length) return this._color;

    this._color = color;
    this.graph.render();

    return this;
}