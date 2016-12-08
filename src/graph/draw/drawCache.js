/**
 * Created by lcx on 2016/12/8.
 */
export default function (canvasObj,x,y) {
    //取得经过计算之后的links 数据

    var links = canvasObj.links;
    var nodes = canvasObj.nodes;
    var context = canvasObj.context;

    //进行绘制
    for(var i=0;i<links.length;i++){
        var sx,sy;
        if(links[i].source.x-links[i].target.x<0){
            sx = links[i].source.x;
            sy = links[i].source.y;
        }else{
            sx = links[i].target.x;
            sy = links[i].target.y;
        }
      context.drawImage(canvasObj.linksCache[i],sx,sy);

    }

    for(var j=0;j<nodes.length;j++){
        context.drawImage(canvasObj.nodesCache[j],nodes[j].getX()-nodes[j].radius,nodes[j].getY()-nodes[j].radius);
    }
}