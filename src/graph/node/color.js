export default function (color) {
    if(!arguments.length) return this._color || "#123456";

    this._color = color;
    graph.render();

    return this;
}