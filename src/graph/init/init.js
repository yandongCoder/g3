import appendPreDefs from "./appendPreDefs";
import appendPreElement from "./appendPreElement";

var init = false;
export default function () {
    if(!init){
        d3.select(this._svg).classed("graph", true);
        appendPreElement.call(this);
        appendPreDefs.call(this);
        init = true;
    }
}