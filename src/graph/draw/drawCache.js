/**
 * Created by lcx on 2016/12/8.
 */
export default function (canvasObj,keyWord,target) {
    //取得经过计算之后的links 数据

    var links = canvasObj.links;
    var nodes = canvasObj.nodes;
    var context = canvasObj.context;
    var width = canvasObj.canvas.width;
    var height = canvasObj.canvas.height;
    var cacheSvg = canvasObj.linksCache;

    //进行绘制

/*    var canvas = document.createElement('canvas');
    canvas.width = canvasObj.canvas.width;
    canvas.height =canvasObj.canvas.height;
    var testContext = canvas.getContext('2d');
    testContext.beginPath();
    testContext.moveTo(0,0);
    testContext.lineTo(canvasObj.canvas.width,canvasObj.canvas.height);
    testContext.strokeStyle = '#ccc';
    testContext.stroke();
    context.fillStyle = '#000';

    for(var i=0;i<links.length;i++){
        var sx,sy,dx,dy;
        if(links[i].source.x-links[i].target.x<0){
            sx = links[i].source.x;
            sy = links[i].source.y;
            dx = links[i].target.x - sx;
            dy = links[i].target.y - sy;
        }else{
            sx = links[i].target.x;
            sy = links[i].target.y;
            dx = links[i].source.x - sx;
            dy = links[i].source.y - sy;
        }

        // var a = (links[i].source.x-links[i].target.x)*(links[i].source.x-links[i].target.x)+(links[i].source.y-links[i].target.y)*(links[i].source.y-links[i].target.y);
        // var b = width*width;
        // var d = links[i].direction || 0;
        // //求宽比
        // var scaleNum = Math.sqrt(a/(2*b));
        // var cacheContext = canvasObj.linksCache[d].getContext('2d');
        //
        // var theta = Math.atan(dy/dx);
        // cacheContext.save();
        // cacheContext.scale(scaleNum,scaleNum);
        // cacheContext.rotate(theta+Math.PI/4);
        // cacheContext.restore();









        context.fillText('测试绘制',100,100);
        // canvasObj.linksCache[i].width = maxx-minx;
        // canvasObj.linksCache[i].height = maxy - miny;
        // context.drawImage(canvasObj.linksCache[i],0,0);
        // context.drawImage(canvasObj.linksCache[i],sx,sy);
        // context.drawImage(canvas,0,0);

    }*/

   /* for(var i=0;i<links.length;i++){
        var sx,sy;
        if(links[i].source.x-links[i].target.x<0){
            sx = links[i].source.x;
            sy = links[i].source.y;
        }else{
            sx = links[i].target.x;
            sy = links[i].target.y;
        }
      context.drawImage(canvasObj.linksCache[i],sx,sy);

    }*/
    if(keyWord == 'dragStart'){
        var targetCanvas = document.createElement('canvas');
        targetCanvas.width = width;
        targetCanvas.height = height;
        var targetContext = targetCanvas.getContext('2d');
        targetContext.save();

        targetContext.translate(canvasObj.transform.x, canvasObj.transform.y);
        targetContext.scale(canvasObj.transform.k, canvasObj.transform.k);

        var otherCanvas = document.createElement('canvas');
        otherCanvas.width = canvasObj.canvas.width;
        otherCanvas.height = canvasObj.canvas.height;
        var otherContext = otherCanvas.getContext('2d');
        otherContext.save();

        otherContext.translate(canvasObj.transform.x, canvasObj.transform.y);
        otherContext.scale(canvasObj.transform.k, canvasObj.transform.k);

        for(var i=0;i<nodes.length;i++){
            if(nodes[i].id == target.id){
                targetContext.drawImage(canvasObj.nodesCache[i],nodes[i].getX()-nodes[i].radius,nodes[i].getY()-nodes[i].radius);
            }else{
                otherContext.drawImage(canvasObj.nodesCache[i],nodes[i].getX()-nodes[i].radius,nodes[i].getY()-nodes[i].radius);
            }
        }
        targetContext.restore();
        otherContext.restore();
        context.drawImage(targetCanvas,0,0);
        context.drawImage(otherCanvas,0,0);
        return {
            targetNodeCanvas:targetCanvas,
            otherNodeCanvas:otherCanvas
        }

    }else if(keyWord == 'drag'){
        var otherCanvas = canvasObj.doubleNodeCanvas.otherNodeCanvas;
        var targetCanvas = canvasObj.doubleNodeCanvas.targetNodeCanvas;
        var targetContext = targetCanvas.getContext('2d');
        targetContext.save();

        targetContext.clearRect(0,0,width,height);
        targetContext.translate(canvasObj.transform.x, canvasObj.transform.y);
        targetContext.scale(canvasObj.transform.k, canvasObj.transform.k);

        for(var i=0;i<nodes.length;i++){
            if(nodes[i].id == target.id){
                targetContext.drawImage(canvasObj.nodesCache[i],nodes[i].getX()-nodes[i].radius,nodes[i].getY()-nodes[i].radius);
            }
        }
        targetContext.restore();
        context.drawImage(targetCanvas,0,0);
        context.drawImage(otherCanvas,0,0);
        canvasObj.doubleNodeCanvas.targetNodeCanvas = targetCanvas;
        return canvasObj.doubleNodeCanvas;
    }else{
        for(var j=0;j<nodes.length;j++){
            context.drawImage(canvasObj.nodesCache[j],nodes[j].getX()-nodes[j].radius,nodes[j].getY()-nodes[j].radius);
        }
    }

    // console.log(cacheSvg);
    //drawLink cache
    // for(var n=0;n<cacheSvg.length;n++){
    //     var data = 'data:image/svg+xml,'+cacheSvg[n];
    //     var image = new Image();
    //     image.src = data;
    //     document.getElementsByTagName('body')[0].appendChild(image);
    //     var minx = Math.min(links[n].source.x,links[n].target.x);
    //     var miny = Math.min(links[n].source.y,links[n].target.y);
    //     context.drawImage(image,minx,miny);
    //
    //     document.getElementsByTagName('body')[0].removeChild(image);
    // }


}

