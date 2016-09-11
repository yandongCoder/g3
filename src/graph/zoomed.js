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


    //不缩放text文字内容
    this._getNodesLabelSelection()
        .attr("height", function(Node){ return Node.size() * self._getCurrentScale(); })
        .style("line-height", function(Node){ return Node.size() * self._getCurrentScale() + "px"; })
        .attr("transform", function(Node){ return "translate(" + (1 + Node.size()) + ", 0) scale(" + 1 / d3.event.transform.k + ")"; });

    //linkLabels文字不缩放
    this._getLinksLabelSelection().attr("transform", function(Link){ return Link.getLinkLabelTransform(d3.event.transform.k); });
    //缩放网络图
    this._getForceGroup().attr("transform", "translate(" + d3.event.transform.x + ", "+ d3.event.transform.y + ") scale(" + d3.event.transform.k + ")");

    // if (Graph.brush) {
    //     //brush框选组件随之缩放
    //     Graph.brush.attr("zoomed", "translate(" + this._getCurrentTranslate() + ") scale(" + this._getCurrentScale() + ")");
    // }
    //将状态记录在config中
    // scope.config.status.translate = Graph.zoom.translate();
    // scope.config.status.scale = Graph.zoom.scale();
}