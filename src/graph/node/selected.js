export default function (selected) {
    if(!arguments.length) return this._selected;

    this._selected = selected;

    this.graph.render();

    return this;
}