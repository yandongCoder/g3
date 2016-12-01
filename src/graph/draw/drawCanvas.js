import drawNodeCanvas from './drawCanvasNode';
import drawLinkCanvas from './drawCanvasLink';
import findPoint from './findPoint';
import convertToCanvasCor from './convertCor';
import findLinks from './findLink';

export default function () {
    var that = this;
    var context = this._canvas.getContext("2d");
    // console.log(that._getCurrentTransform());
    //绘制的canvas 对象，在优化的时候可以对nodes 和 links 的数据进行相应的分组优化
    var canvas = {
        canvas:that._canvas,
        context:context,
        nodes:this.getRenderedNodes(),
        links:this.getRenderedLinks(),
        transform:that._getCurrentTransform()
    };


    //进行事件绑定，canvas 在进行事件绑定的时候没有对应的dom 结构，所以要进行相应的计算来判断事件的目标对象时哪个点或者边
    render();
    //绘制
    //canvas 事件绑定
    d3.select(this._canvas)
        .on('click',_click)
        .on('dblclick',_dblClick)
        .on('mousemove',_mousemove)
        .call(d3.drag()
            .container(that._canvas)
            .subject(dragsubject)
            // .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .call( d3.zoom().scaleExtent([0.5, 8]).on('zoom', zoomed) )
        // .on("mousedown.zoom", null)
        .on("dblclick.zoom", null);//取消双击时zoom 事件的触发
    // that._hasInit = true;


    function render() {
        canvas.nodes = that.getRenderedNodes();
        canvas.links = that.getRenderedLinks();
        context.clearRect(0, 0, that._canvas.width, that._canvas.height);
        context.save();
        context.translate(canvas.transform.x, canvas.transform.y);
        context.scale(canvas.transform.k, canvas.transform.k);
        drawLinkCanvas(canvas);
        drawNodeCanvas(canvas);
        context.restore();
    }


    //单击事件
    function _click(d) {
        var p = convertToCanvasCor(that._canvas,d3.event.x,d3.event.y);
        var x = canvas.transform.invertX(p.x);
        var y = canvas.transform.invertY(p.y);
        var targetNode = findPoint(canvas.nodes,x,y);
        //调用click 的回调函数
        // console.log(targetNode);
        // console.log(targetNode);
        // render();
        if(targetNode){
            if(!d3.event.ctrlKey){
                if(targetNode.selected()) return;
                that.unselectNodes();
            }
            targetNode.selected(!targetNode.selected());
        }else{
            console.log(context.isPointInPath(x,y));
            // targetNode = findLinks(context,canvas.links,x,y);
            // console.log(targetNode);
            that.unselectNodes();
        }

    }

    //双击事件
    function _dblClick(d) {
        var p = convertToCanvasCor(that._canvas,d3.event.x,d3.event.y);
        var x = canvas.transform.invertX(p.x);
        var y = canvas.transform.invertY(p.y);
        var targetNode = findPoint(canvas.nodes,x,y);
        // console.log(targetNode);
        //调用dblClick 的回调函数
        // console.log(targetNode);


        // $scope.$emit('dblClickNode',targetNode);

    }

    function _mousemove() {
        var p = convertToCanvasCor(that._canvas,d3.event.x,d3.event.y);
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