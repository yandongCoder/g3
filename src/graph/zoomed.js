export default function () {
    var self = this;
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


    //缩放网络图
    //this._getForceGroup().attr("transform", "translate(" + d3.event.transform.x + ", "+ d3.event.transform.y + ") scale(" + self._getCurrentScale() + ")");

    self.render();

    //将状态记录在config中
    // scope.config.status.translate = Graph.zoom.translate();
    // scope.config.status.scale = Graph.zoom.scale();
}