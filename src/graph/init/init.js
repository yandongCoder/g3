import Zoom from "./Zoom";
import Brush from "./Brush";
import Drag from "./Drag";

export default function () {
    //init trigger only once a graph
    if(this._hasInit) return;
    
    //this._getSvgSelection()
    //    .classed("graph", true);

    //bind listener to page for keyboard shortCuts and mouse events
    d3.select(document.body)
        .on("keydown.brush", this._keydowned.bind(this))
        .on("keyup.brush", this._keyupped.bind(this));


    //add drag behavior to graph
    this._getCanvas()
        .call(Drag.call(this));


    //add zoom instance to graph
    this.zoom = Zoom.call(this);
    this._getCanvas()
        .call(this.zoom);

    //add brush instance to graph
    // this.brush = Brush.call(this);
    // this._getBrushSelection()
    //     .call(this.brush);

    this._hasInit = true;
}