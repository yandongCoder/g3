import drawNodeCanvas from './drawCanvasNode_';
import drawLinkCanvas from './drawCanvasLink';
import findPoint from './findPoint';
import convertToCanvasCor from './convertCor';
import findLinks from './findLink';
import drawCache from './drawCache';
import redrawNodeCanvas from './redrawCanvasNode';

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
        linksCache:that.linksCache,
        zoomCache:null

    };

    // d3.json('../src/graph/canvas/font-awesome-data.json',function (data) {
    //     console.log(data);
    //     canvas.fontAwesome = data;
    // });

    var nodeCanvas = document.createElement('canvas');
    nodeCanvas.width = that.element.width;
    nodeCanvas.height = that.element.height;
    canvas.nodeCanvas = nodeCanvas;

    //进行事件绑定，canvas 在进行事件绑定的时候没有对应的dom 结构，所以要进行相应的计算来判断事件的目标对象时哪个点或者边
    render();
    //绘制
    //canvas 事件绑定
    d3.select(this.element)
        // .on('mousedown',_click)
        // .on('click',_click)
        .on('dblclick',_dblClick)
        .on('mousemove',_mousemove)
        .call(d3.drag()
            .container(that.element)
            .subject(dragsubject)
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .call( d3.zoom().scaleExtent([0.5, 8])
            .on('zoom', zoomed)
            .on('end',function () {
                // render('zoom');
            })
        )
        // .on("mousedown.zoom", null)
        .on("dblclick.zoom", null);//取消双击时zoom 事件的触发
    // that._hasInit = true;


    //若x,y 有值，则为单击时的重新渲染
    function render(keyWord,target) {

        canvas.nodes = that.getRenderedNodes();
        canvas.links = that.getRenderedLinks();
        context.clearRect(0, 0, that.element.width, that.element.height);
        context.save();


        if(keyWord == 'dragStart'){
            canvas.doubleCanvas = drawLinkCanvas.call(that,canvas,keyWord,target);
            // canvas.doubleNodeCanvas = drawCache(canvas,keyWord,target);
        }else if(keyWord == 'drag'){
            canvas.doubleCanvas = drawLinkCanvas.call(that,canvas,keyWord,target);
            redrawNodeCanvas.call(that,canvas,target);
            drawCache.call(that,canvas);

            // canvas.doubleNodeCanvas = drawCache(canvas,keyWord,target);
            /*var nodeCanvas = canvas.nodeCanvas;
            var nodeContext = nodeCanvas.getContext('2d');
            nodeContext.clearRect(0,0,that.element.width,that.element.height);
            nodeContext.save();
            nodeContext.translate(canvas.transform.x, canvas.transform.y);
            nodeContext.scale(canvas.transform.k, canvas.transform.k);
            var nodes = canvas.nodes;
            for(var j=0;j<nodes.length;j++){
                nodeContext.drawImage(canvas.nodesCache[j],nodes[j].getX()-nodes[j].radius,nodes[j].getY()-nodes[j].radius);
            }
            nodeContext.restore();
            context.drawImage(nodeCanvas,0,0);*/
        }else{
            // context.translate(canvas.transform.x, canvas.transform.y);
            // context.scale(canvas.transform.k, canvas.transform.k);
            canvas.doubleCanvas = null;
            drawLinkCanvas.call(that,canvas);
            // drawNodeCanvas.call(that,canvas);
            redrawNodeCanvas.call(that,canvas);

            drawCache.call(that,canvas);
        }

        context.restore();



    }


    //单击事件
    function _click(d) {
        console.log(d);
        var p = convertToCanvasCor(that.element, d3.event.x, d3.event.y);
        // var p = convertToCanvasCor(that._canvas,d3.event.x,d3.event.y);
        var x = canvas.transform.invertX(p.x);
        var y = canvas.transform.invertY(p.y);
        var targetNode = findPoint(canvas.nodes,x,y);
        var targetLink = null;
        if(!targetNode) targetLink = findLinks(canvas,x,y);
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
        console.log('dbclick');
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

    function dragstarted() {
        render('dragStart',d3.event.subject);
        // _click();
        //进行重绘

    }

    //拖拽
    function dragged() {
        console.log('drag');
        d3.event.subject.x = canvas.transform.invertX(d3.event.x);
        d3.event.subject.y = canvas.transform.invertY(d3.event.y);
        //进行重绘
        render('drag',d3.event.subject);

    }

    //拖拽结束
    function dragended() {
        // console.log('dragend');
        d3.event.subject.x = canvas.transform.invertX(d3.event.x);
        d3.event.subject.y = canvas.transform.invertY(d3.event.y);
    }

    function zoomed() {
        console.log(d3.event.transform.k);
        // console.log('zoom');
        canvas.transform = d3.event.transform;
        //进行重绘
        render('zoom');
    }

}