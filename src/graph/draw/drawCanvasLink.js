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
    context.strokeStyle = "#ccc";
    var targetLink = null;
    for(var i=0;i<links.length;i++){
     /*   canvasObj.linksCache[i].width = Math.abs(links[i].source.x-links[i].target.x);
        canvasObj.linksCache[i].height = Math.abs(links[i].source.y-links[i].target.y);
        var cacheCtx = canvasObj.linksCache[i].getContext('2d');*/
        var tag = drawArrow(context,links[i],3,x,y);
        if(tag) targetLink = links[i];

    }
    return targetLink;
}