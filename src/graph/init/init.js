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
    appendPreElement.call(this);
    appendPreDefs.call(this);


    this._getSvgSelection()
        .classed("graph", true)
        .on('click', function(){
            if (d3.event.target.nodeName !== 'svg') return;
            
            self.deselectAll();
    
            self._config.onGraphClick.call(this);
        })
        .on('contextmenu', function(){
            if (d3.event.target.nodeName !== 'svg') return;
            self._config.onGraphContextmenu.call(this);
        });

    //bind listener to page for keyboard shortCuts and mouse events
    d3.select(document.body)
        .on("keydown.brush", this._keydowned.bind(this))
        .on("keyup.brush", this._keyupped.bind(this));

    //add zoom instance to graph
    this.zoom = Zoom.call(this);
    this._getSvgSelection()
        .call(this.zoom);

    //add brush instance to graph
    this.brush = Brush.call(this);
    this._getBrushSelection()
        .call(this.brush);

    
    //new drag instance for bind to nodes
    this.dragNode = dragNode.call(this);

    this._hasInit = true;
}