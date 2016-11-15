import {RENDER_TYPE} from "../CONSTANT";

export default function (nudgeX, nudgeY) {
    if(!this.graph.config.dragable) return;
    
    this.x += nudgeX;
    this.y += nudgeY;
    
    this.graph.delayRender(this, RENDER_TYPE.NUDGE);
    return this;
}