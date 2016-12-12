import drawNodeCanvas from './drawCanvasNode';
import drawLinkCanvas from './drawCanvasLink';
import findPoint from './findPoint';
import convertToCanvasCor from './convertCor';
import findLinks from './findLink';
import drawCache from './drawCache';

export default function () {
    var that = this;
    var context = this.element.getContext("2d");
    // console.log(that._getCurrentTransform());
    //绘制的canvas 对象，在优化的时候可以对nodes 和 links 的数据进行相应的分组优化
    var canvas = {
        canvas:that.element,
        context:context,
        nodes:this.getRenderedNodes(),
        links:this.getRenderedLinks(),
        transform:that.currentTransform(),
        nodesCache:that.nodesCache,//离屏缓存canvas
        linksCache:that.linksCache
    };


    //进行事件绑定，canvas 在进行事件绑定的时候没有对应的dom 结构，所以要进行相应的计算来判断事件的目标对象时哪个点或者边
    render();
    //绘制
    //canvas 事件绑定
    d3.select(this.element)
        .on('click',_click)
        .on('dblclick',_dblClick)
        .on('mousemove',_mousemove)
        .call(d3.drag()
            .container(that.element)
            .subject(dragsubject)
            // .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .call( d3.zoom().scaleExtent([0.5, 8]).on('zoom', zoomed) )
        // .on("mousedown.zoom", null)
        .on("dblclick.zoom", null);//取消双击时zoom 事件的触发
    // that._hasInit = true;


    //若x,y 有值，则为单击时的重新渲染
    function render(x,y) {
        canvas.nodes = that.getRenderedNodes();
        canvas.links = that.getRenderedLinks();
        context.clearRect(0, 0, that.element.width, that.element.height);
        context.save();
        context.translate(canvas.transform.x, canvas.transform.y);
        context.scale(canvas.transform.k, canvas.transform.k);
        // drawCache(canvas,x,y);
        drawLinkCanvas(canvas,x,y);
        drawNodeCanvas(canvas);
        context.restore();
    }


    //单击事件
    function _click(d) {
        var p = convertToCanvasCor(that.element, d3.event.x, d3.event.y);
        // var p = convertToCanvasCor(that._canvas,d3.event.x,d3.event.y);
        var x = canvas.transform.invertX(p.x);
        var y = canvas.transform.invertY(p.y);
        var targetNode = findPoint(canvas.nodes,x,y);
        var targetLink = null;
        if(!targetNode) targetLink = findLinks(canvas,p.x,p.y);
        //调用click 的回调函数
        if(targetNode){
            if(!d3.event.ctrlKey){
                if(targetNode.selected) return;
                that.getSelectedNodes().forEach(function (node) {
                    node.attr('selected',false);
                });
                that.getSelectedLinks().forEach(function (link) {
                    link.attr('selected',false);
                });
            }
            targetNode.attr('selected',!targetNode.selected);
        }else{
            if(targetLink){
                //选中lilnk
                if(!d3.event.ctrlKey){
                    if(targetLink.select) return;
                    that.getSelectedLinks().forEach(function (link) {
                        link.attr('selected',false);
                    });
                    that.getSelectedNodes().forEach(function (node) {
                        node.attr('selected',false);
                    });
                }
                if(targetLink.attr('selected')){
                    //取消选中 箭头指向的点
                    if(targetLink.hasSourceArrow() && targetLink.hasTargetArrow()){
                        //
                        targetLink.source.attr('selected',false);
                        targetLink.target.attr('selected',false);
                    }else if(targetLink.hasSourceArrow()){
                        targetLink.source.attr('selected',false);
                    }else if(targetLink.hasTargetArrow()){
                        targetLink.target.attr('selected',false);
                    }
                }else{
                    //选中 箭头指向的点
                    if(targetLink.hasSourceArrow() && targetLink.hasTargetArrow()){
                        //
                        targetLink.source.attr('selected',true);
                        targetLink.target.attr('selected',true);
                    }else if(targetLink.hasSourceArrow()){
                        targetLink.source.attr('selected',true);
                    }else if(targetLink.hasTargetArrow()){
                        targetLink.target.attr('selected',true);
                    }
                }
                targetLink.attr('selected',!targetLink.selected);

            }else{
                that.getSelectedNodes().forEach(function (node) {
                    node.attr('selected',false);
                });
                that.getSelectedLinks().forEach(function (link) {
                    link.attr('selected',false);
                });
            }

        }

    }

    //双击事件
    function _dblClick(d) {
        var p = convertToCanvasCor(that.element, d3.event.x, d3.event.y);
        var x = canvas.transform.invertX(p.x);
        var y = canvas.transform.invertY(p.y);
        var targetNode = findPoint(canvas.nodes,x,y);
        // console.log(targetNode);
        //调用dblClick 的回调函数
        // console.log(targetNode);


        // $scope.$emit('dblClickNode',targetNode);

    }

    function _mousemove() {
        var p = convertToCanvasCor(that.element, d3.event.x, d3.event.y);
        var x = canvas.transform.invertX(p.x);
        var y = canvas.transform.invertY(p.y);
        var targetNode = findPoint(canvas.nodes,x,y);
        if(targetNode){
            if(canvas.mouseTarget && targetNode.id == canvas.mouseTarget.id){
                //nodeMouseOver mouseOver 回调函数
                // console.log('mouseover');
                // console.log(targetNode);
            }else{
                //mouseup 回调函数
                // console.log('mouseout');

            }
            canvas.mouseTarget = targetNode;
            // render();

        }else{
            //mouseout
            if(canvas.mouseTarget){
                // console.log('out'); mouseout 回调函数
                // console.log('mousemove');
                // render();
            }

        }
    }

    function dragsubject() {
        // console.log('dragsubject');
        var transform = canvas.transform;

        var x = canvas.transform.invertX(d3.event.x);
        var y = canvas.transform.invertY(d3.event.y);

        var targetNode = findPoint(canvas.nodes,x,y);
        if(targetNode){
            targetNode.x = canvas.transform.applyX(targetNode.x);
            targetNode.y = canvas.transform.applyY(targetNode.y);
        }
        // console.log(targetNode);
        return targetNode;
    }

    //拖拽
    function dragged() {
        // console.log('drag');
        d3.event.subject.x = canvas.transform.invertX(d3.event.x);
        d3.event.subject.y = canvas.transform.invertY(d3.event.y);
        //进行重绘
        render();

    }

    //拖拽结束
    function dragended() {
        // console.log('dragend');
        d3.event.subject.x = canvas.transform.invertX(d3.event.x);
        d3.event.subject.y = canvas.transform.invertY(d3.event.y);
    }

    function zoomed() {
        // console.log('zoom');
        canvas.transform = d3.event.transform;

        //进行重绘
        render();
    }

}