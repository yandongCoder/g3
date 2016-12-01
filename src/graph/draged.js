import {RENDER_TYPE} from "./CONSTANT";

export default function (currentNode) {
    var nudgedNodes = this.getSelectedNodes();
    for(var i = nudgedNodes.length; i--;){
        nudgedNodes[i]._nudge(d3.event.dx, d3.event.dy, true);
        this.updateDOM.addObj(nudgedNodes[i]);
    }
    this.delayRender(null, RENDER_TYPE.NUDGE);
}