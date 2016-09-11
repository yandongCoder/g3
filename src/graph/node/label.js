export default function (label) {
    if(!arguments.length) return this._label || "No label";

    this._label = label;
    graph.render();

    return this;
}