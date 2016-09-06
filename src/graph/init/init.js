import appendPreDefs from "./appendPreDefs";
import appendPreElement from "./appendPreElement";
import initZoom from "./zoom";

export default function () {
    this.zoom = initZoom.call(this);
    appendPreElement.call(this);
    appendPreDefs.call(this);

    d3
        .select(this._svg)
        .classed("graph", true)
        .call(this.zoom);
}