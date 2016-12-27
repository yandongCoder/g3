import {RENDER_TYPE} from "./CONSTANT";

export default function () {
    
    if (!this.config.zoomable) return;
    
    var previousScale = this.graphGroup._pScale;
    var currentScale = this.currentTransform().k.toFixed(4) / 1;
    //缩放网络图
    this.graphGroup.attr("transform", "translate(" + d3.event.transform.x + ", "+ d3.event.transform.y + ") scale(" + currentScale + ")");
    this.graphGroup._pScale = currentScale;
    
    var hideScale = d3.min([this._config.scaleOfHideNodeLabel, this._config.scaleOfHideLinkLabel]);
    
    //render while should hide label
    if(previousScale >= hideScale && currentScale <= hideScale) this.render(RENDER_TYPE.ZOOM);
    //panning don't need re-render, render only after zooming
    if(currentScale !== previousScale && currentScale > hideScale) this.render(RENDER_TYPE.ZOOM);
}