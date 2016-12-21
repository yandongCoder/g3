import appendPreDefs from "./appendPreDefs";
import appendPreElement from "./appendPreElement";
import Zoom from "./zoom";
import Brush from "./brush";
import dragNode from "./dragNodes";

export default function () {
    //init trigger only once a graph
    if(this._hasInit) return;

    var self = this;

    //add predefined DOM
    appendPreDefs.call(this);
    appendPreElement.call(this);


    this.svgSelection()
        .classed("graph", true)
        .style("background", this._config.background)
        .call(this._config.bindGraphEvent)
        .on("click.deselect", function () {
            if (d3.event.target.nodeName !== 'svg') return;
            self.getNodesOP().attr('selected', false);
            self.getLinksOP().attr('selected', false);
        }, true);

    //bind listener to page for keyboard shortCuts and mouse events
    d3.select(document.body)
        .on("keydown.brush", this._keydowned.bind(this))
        .on("keyup.brush", this._keyupped.bind(this));

    //add zoom instance to graph
    this.zoom = Zoom.call(this);
    this.svgSelection()
        .call(this.zoom);

    //add brush instance to graph
    this.brush = Brush.call(this);
    this.brushSelection()
        .call(this.brush);

    
    //new drag instance for bind to nodes
    this.drag = dragNode.call(this);

    this._hasInit = true;
}
