export default function (radius) {
    if(!arguments.length) return this._radius;

    this._radius = radius;
    this.graph.render(true);

    return this;
}