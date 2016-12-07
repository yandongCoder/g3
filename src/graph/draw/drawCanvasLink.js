/**
 * Created by lcx on 2016/11/1.
 * 利用canvas 画线
 */
import drawArrow from './drawArrow';
export default function (canvasObj,x,y) {
    //取得经过计算之后的links 数据
    var links = canvasObj.links;
    var context = canvasObj.context;
    //进行绘制
    // context.beginPath();
    context.strokeStyle = "#ccc";
    context.lineWidth = 3;
    var targetLink = null;
    for(var i=0;i<links.length;i++){
        // drawArrow(context,links[i].source.getX(), links[i].source.getY(),links[i].target.getX(), links[i].target.getY(),links[i].target.radius(),3);
        /*console.log(x,y);
        console.log(links[i]);*/
        var tag = drawArrow(context,links[i],3,x,y);
        if(tag) targetLink = links[i];
        // context.moveTo(links[i].source.getX(), links[i].source.getY());
        // context.lineTo(links[i].target.getX(), links[i].target.getY());
    }
    console.log(targetLink);
    return targetLink;
    // context.stroke();
}