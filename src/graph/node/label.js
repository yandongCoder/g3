export default function (label) {
    if(!arguments.length) return this._label || "";

    this._label = label;
    this.graph.render(true);

    return this;
}