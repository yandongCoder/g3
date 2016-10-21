export default function (selected, notRender) {
    if(!arguments.length) return this._selected;
    this._selected = selected;

    if(!notRender) this.graph.render(true);

    return this;
}