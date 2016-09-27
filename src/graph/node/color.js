export default function (color) {
    if(!arguments.length) return this._color || "#123456";

    this._color = color;
    this.graph.render(true);

    return this;
}