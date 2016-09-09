export default function (selected) {
    if(!arguments.length) return this._selected;

    this._selected = selected;
    d3.select(this._element).classed("selected", selected);

    return this;
}