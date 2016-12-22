/**
 * Created by lcx on 2016/11/7.
 */
import drawCanvasLink from './drawCanvasLink';
import  drawCanvasNode from './drawCanvasNode';
import drawArrow from './drawArrow';
export default function (canvasObj, x, y,lineWidth) {
    // console.log(links);
    var context = canvasObj.context;
    var target = null;
    var targets = [];
    var lineWidth = lineWidth || 10;
    //判断是否选中线 采用计算的方法，不使用isPointInPath 方法
    var links = canvasObj.links;
    for(var i=0;i<links.length;i++){
        var point = drawArrow(links[i],3,x,y);
        if(calc(point,x,y)){
            target = links[i];
            // targets.push(links[i]);
        }
    }

    return target;

    function calc(point,x,y) {
        //判断点击的点是否在该线的区域内
        var minx = Math.min.apply(null,[point.x1,point.x2]);
        var maxx = Math.max.apply(null,[point.x1,point.x2]);
        var miny = Math.min.apply(null,[point.y1,point.y2]);
        var maxy = Math.max.apply(null,[point.y1,point.y2]);
        if(isInArea(x,minx,maxx) && isInArea(y,miny,maxy)){
            if(point.x1-point.x2==0 || point.y1-point.y2 == 0){
                //垂直 或 水平
                return true;
            }
            var dy = (y-point.y1)/(x-point.x1)*(point.x2-point.x1)-(point.y2-point.y1);
            var dx = (x-point.x1)/(y-point.y1)*(point.y2-point.y1)-(point.x2-point.x1);
            var targetLink = false;
            if(dy>=-lineWidth && dy <= lineWidth){
                targetLink = true;
            }else if(dx>=-lineWidth && dx <= lineWidth){
                targetLink = true;
            }
            return targetLink;
        }else{
            return false;
        }



    }
    
    function isInArea(x,minx,maxx) {
        var x1 = x-5;
        var x2 = x+5;
        if(minx == maxx){
            return true;
        }

        if(x>=minx && x<=maxx){
            return true;
        }else if(x1>=minx && x1<=maxx){
            return true;
        }else if(x2>=minx && x2<=maxx){
            return true;
        }else{
            return false;
        }
    }












  /*  function render(x,y) {
        context.clearRect(0, 0, canvasObj.canvas.width, canvasObj.canvas.height);
        context.save();
        context.translate(canvasObj.transform.x, canvasObj.transform.y);
        context.scale(canvasObj.transform.k, canvasObj.transform.k);
        target = drawCanvasLink(canvasObj,x,y);
        drawCanvasNode(canvasObj);
        context.restore();
    }
    render(x,y);
    return target;*/

}
