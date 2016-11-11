import {RENDER_TYPE} from "./CONSTANT";
export default function () {
    //不可移动
    if (!this.movable) {
        //将变换前的translate值赋给变换后的translate值,保持位置不变
        //this.zoom.translate(scope.config.status.translate);
    }
    //不可缩放
    if (!this.zoomable) {
        //this.zoom.scale(scope.config.status.scale);
    }
    //Graph._ifShowLabels();
    
    var previousScale = this._getForceGroup()._pScale;
    var currentScale = this._getCurrentScale().toFixed(4);
    //缩放网络图
    this._getForceGroup().attr("transform", "translate(" + d3.event.transform.x + ", "+ d3.event.transform.y + ") scale(" + currentScale + ")");
    this._getForceGroup()._pScale = currentScale;
    
    //panning don't need re-render, render only after zooming
    if(previousScale !== currentScale) this.render(null, RENDER_TYPE.ZOOM);
}