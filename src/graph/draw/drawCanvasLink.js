/**
 * Created by lcx on 2016/11/1.
 * 利用canvas 画线
 */
import drawArrow from './drawArrow';
export default function (canvasObj,tag,target) {
    //取得经过计算之后的links 数据
    var links = canvasObj.links;
    var nodes = canvasObj.nodes;
    var cacheCtx = canvasObj.context;
    var width = canvasObj.canvas.width;
    var height = canvasObj.canvas.height;

    //进行绘制
    // context.strokeStyle = "#ccc";
    var targetLink = null;
    // var lineList = [];
    // var pointList = [];
    var selectedLinks = this.getSelectedLinks();



    if(tag == 'dragStart'){
        var departLinks = getDepartLinks(links,target);
        var selectedDepart = getDepartLinks(selectedLinks,target);
        var targetLinks = departLinks.targetLinks;
        var otherLinks = departLinks.otherLinks;
        var selectedTargetLinks = selectedDepart.targetLinks;
        var selectedOtherLinks = selectedDepart.otherLinks;
        //drag 操作，需要分成两张画布进行渲染  和target 相连的线+target 单独绘制在一张画布上面
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





        //先绘制其他
        otherContext.lineWidth=3;
        if(selectedOtherLinks.length>0){
            otherContext.beginPath();
            otherContext.strokeStyle = '#f00';
            for(var m=0;m<selectedOtherLinks.length;m++){

                drawArrow(otherContext,selectedOtherLinks[m],3);
            }
            otherContext.stroke();
        }

        otherContext.beginPath();
        otherContext.strokeStyle = '#ccc';
        //画线
        for(var i=0;i<otherLinks.length;i++){
            if(!otherLinks[i].attr('selected')){
                drawArrow(otherContext,otherLinks[i],3);
            }
            var text = otherLinks[i].label;

            var s1 = otherLinks[i].source.getX();
            var e1 =otherLinks[i].source.getY();
            var s2 = otherLinks[i].target.getX();
            var e2 = otherLinks[i].target.getY();


            otherContext.fillText(text,(s2+s1)/2,(e2+e1)/2);
        }
        otherContext.stroke();
      /*  for(var k=0;k<nodes.length;k++){
            if(nodes[k].id != target.id){
                otherContext.drawImage(canvasObj.nodesCache[k],nodes[k].getX()-nodes[k].radius,nodes[k].getY()-nodes[k].radius);
            }
        }*/


        otherContext.restore();


        //绘制拖拽选中的link-----------------------------------
        targetContext.lineWidth=3;
        if(selectedTargetLinks.length>0){
            targetContext.beginPath();
            targetContext.strokeStyle = '#f00';
            for(var m=0;m<selectedTargetLinks.length;m++){

                drawArrow(targetContext,selectedTargetLinks[m],3);
            }
            targetContext.stroke();
        }

        targetContext.beginPath();
        targetContext.strokeStyle = '#ccc';
        //画线
        for(var i=0;i<targetLinks.length;i++){
            if(!targetLinks[i].attr('selected')){
               drawArrow(targetContext,targetLinks[i],3);
            }
            var text = targetLinks[i].label;

            var s1 = targetLinks[i].source.getX();
            var e1 =targetLinks[i].source.getY();
            var s2 = targetLinks[i].target.getX();
            var e2 = targetLinks[i].target.getY();


            targetContext.fillText(text,(s2+s1)/2,(e2+e1)/2);
        }
        targetContext.stroke();
        // for(var n=0;n<nodes.length;n++){
        //     if(nodes[n].id == target.id){
        //         targetContext.drawImage(canvasObj.nodesCache[n],nodes[n].getX()-nodes[n].radius,nodes[n].getY()-nodes[n].radius);
        //     }
        // }
        targetContext.restore();

        cacheCtx.drawImage(otherCanvas,0,0);
        cacheCtx.drawImage(targetCanvas,0,0);

        return {
            otherCanvas:otherCanvas,
            targetCanvas:targetCanvas
        };

    }else if(tag == 'drag'){
        var departLinks = getDepartLinks(links,target);
        var selectedDepart = getDepartLinks(selectedLinks,target);
        var targetLinks = departLinks.targetLinks;
        var otherLinks = departLinks.otherLinks;
        var selectedTargetLinks = selectedDepart.targetLinks;
        var selectedOtherLinks = selectedDepart.otherLinks;

        var otherCanvas = canvasObj.doubleCanvas.otherCanvas;
        var targetCanvas = canvasObj.doubleCanvas.targetCanvas;
        var targetContext = targetCanvas.getContext('2d');
        targetContext.save();
        targetContext.clearRect(0,0,width,height);
        targetContext.translate(canvasObj.transform.x, canvasObj.transform.y);
        targetContext.scale(canvasObj.transform.k, canvasObj.transform.k);


        targetContext.lineWidth=3;
        if(selectedTargetLinks.length>0){
            targetContext.beginPath();
            targetContext.strokeStyle = '#f00';
            for(var m=0;m<selectedTargetLinks.length;m++){

                drawArrow(targetContext,selectedTargetLinks[m],3);
            }
            targetContext.stroke();
        }

        targetContext.beginPath();
        targetContext.strokeStyle = '#ccc';
        //画线
        for(var i=0;i<targetLinks.length;i++){
            if(!targetLinks[i].attr('selected')){
                drawArrow(targetContext,targetLinks[i],3);
            }
            var text = targetLinks[i].label;

            var s1 = targetLinks[i].source.getX();
            var e1 =targetLinks[i].source.getY();
            var s2 = targetLinks[i].target.getX();
            var e2 = targetLinks[i].target.getY();


            targetContext.fillText(text,(s2+s1)/2,(e2+e1)/2);
        }
        targetContext.stroke();
       /* for(var j=0;j<nodes.length;j++){
            if(nodes[j].id == target.id){
                targetContext.drawImage(canvasObj.nodesCache[j],nodes[j].getX()-nodes[j].radius,nodes[j].getY()-nodes[j].radius);
            }
        }*/
        targetContext.restore();
        cacheCtx.drawImage(otherCanvas,0,0);
        cacheCtx.drawImage(targetCanvas,0,0);
        canvasObj.doubleCanvas.targetCanvas = targetCanvas;
        return canvasObj.doubleCanvas;
    }else{
        //无区别重绘
        var context = this.linkCanvas.getContext('2d');
        context.clearRect(0,0,this.element.width,this.element.height);
        context.save();
        context.translate(canvasObj.transform.x, canvasObj.transform.y);
        context.scale(canvasObj.transform.k, canvasObj.transform.k);

        context.lineWidth=3;
        if(selectedLinks.length>0){
            context.beginPath();
            context.strokeStyle = '#f00';
            for(var m=0;m<selectedLinks.length;m++){

               drawArrow(context,selectedLinks[m],3);
            }
            context.stroke();

        }


        context.beginPath();
        context.strokeStyle = '#ccc';
        //画线
        for(var i=0;i<links.length;i++){
            if(!links[i].attr('selected')){
                drawArrow(context,links[i],3);
            }
        }
        context.stroke();
        if(canvasObj.transform.k>=1){
            context.strokeWidth = 0;
            context.fillStyle = '#555';
            context.font="16px 微软雅黑";
            for(var k=0;k<links.length;k++){
                var text = links[k].label;

                var s1 = links[k].source.getX();
                var e1 = links[k].source.getY();
                var s2 = links[k].target.getX();
                var e2 = links[k].target.getY();


                context.fillText(text,(s2+s1)/2,(e2+e1)/2);
            }
        }

        context.restore();
        cacheCtx.drawImage(this.linkCanvas,0,0);

        /*cacheCtx.beginPath();
         cacheCtx.fillStyle = '#ccc';
         //画三角形
         for(var j=selectedLinks.length;j<lineList.length;j++){
         var tag = pointList[j].tag;
         lineList[j].drawArrowhead(cacheCtx,tag);
         }
         cacheCtx.fill();*/
        //画文字

        return targetLink;


    }





    // var selectedLinks = this.getSelectedLinks();


    function getDepartLinks(links, target) {
        var targetList = [];
        var otherList = [];
        for(var i=0;i<links.length;i++){
            if(links[i].source.id == target.id || links[i].target.id == target.id){
                targetList.push(links[i]);
            }else{
                otherList.push(links[i]);
            }
        }
        return {
            targetLinks:targetList,
            otherLinks:otherList
        }
    }

}