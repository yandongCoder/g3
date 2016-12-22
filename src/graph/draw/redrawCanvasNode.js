
/**
 * Created by lcx on 2016/11/1.
 * 利用canvas 画点 
 */
import {COLOR,FONT} from "../CONSTANT";
export default function (canvasObj,target) {
    var nodes = this.getRenderedNodes();
    // var context = canvasObj.context;
    //对node 进行分类 按颜色进行分类 不同的颜色画在不同的画布上，但是所有点的总共的颜色不宜过多 否则在点线多的情况下会影响整体效率
    var colorList = this.colorList;
    var nodeDepartList = this.nodesDepartList;
    var selectedNodeDepartList = [];
    var cache = this.nodesCache;
    var selectedNodes = this.getSelectedNodes();
    colorList.forEach(function () {
        selectedNodeDepartList.push([]);
    });

    for(var l=0;l<selectedNodes.length;l++){
        if(selectedNodes[l].color){
            var index = colorList.indexOf(selectedNodes[l].color);
            selectedNodeDepartList[index].push(selectedNodes[l]);
        }else{
            var index = colorList.indexOf(COLOR);
            selectedNodeDepartList[index].push(selectedNodes[l]);
        }

    }

    if(target){
        //drag 操作，渲染某一张canvas 即可
        var index = 0;
        if(target.color){
            index = colorList.indexOf(target.color);
        }else{
            index = colorList.indexOf(COLOR);
        }
        var context = cache[index].getContext('2d');
        context.clearRect(0,0,this.element.width,this.element.height);
        context.save();
        context.translate(canvasObj.transform.x, canvasObj.transform.y);
        context.scale(canvasObj.transform.k, canvasObj.transform.k);
        var selectedNodes = selectedNodeDepartList[index];
        var nodes = nodeDepartList[index];
        if(selectedNodeDepartList[index].length>0){
            //绘制选中状态的点
            context.beginPath();
            context.lineWidth=10;
            context.strokeStyle = '#f65565';
            context.fillStyle = colorList[i];
            for(var m=0;m<selectedNodes.length;m++){
                var Node = selectedNodes[m];
                var x = Node.getX();
                var y = Node.getY();
                var r = Node.radius;

                var radius =  Node.radius-5 ;
                context.moveTo(x, y);
                context.arc(x, y, radius, 0, 2 * Math.PI);
            }
            context.stroke();
            context.fill();

            if(canvasObj.transform.k>=1){
//画字
                context.beginPath();
                context.strokeWidth = 1;
                context.font="16px 微软雅黑";
                context.textAlign='left';
                context.textBaseline='hanging';
                for(var k=0;k<selectedNodes.length;k++){
                    var Node = selectedNodes[k];
                    var x = Node.getX();
                    var y = Node.getY();
                    var r = Node.radius;

                    var radius =  Node.radius-5 ;
                    var labelLength = context.measureText(Node.label).width+10;
                    context.fillStyle='#f65565';
                    context.fillRect(x+radius,y+radius,labelLength,20);

                    context.fillStyle = '#555';
                    var label = Node.label;
                    context.fillText(label,x+r,y+r);

                }
            }


        }

        context.beginPath();
        context.lineWidth=1;
        context.strokeStyle = colorList[i];
        context.fillStyle = colorList[i];
        for(var n=0;n<nodes.length;n++){
            var Node = nodes[n];
            if(!Node.attr('selected')){
                var x = Node.getX();
                var y = Node.getY();
                var r = Node.radius;


                var radius = Node.radius;
                context.fillStyle = Node.color;
                context.strokeStyle=Node.color;

                context.moveTo(x, y);

                context.arc(x, y, radius, 0, 2 * Math.PI);
            }

        }
        context.stroke();
        context.fill();
        if(canvasObj.transform.k>=1) {
            context.beginPath();
            context.strokeWidth = 1;
            context.font="16px 微软雅黑";
            context.textAlign='left';
            context.textBaseline='hanging';
            context.fillStyle = '#555';
            for(var a=0;a<nodes.length;a++){
                var Node = nodes[a];
                var x = Node.getX();
                var y = Node.getY();
                var r = Node.radius;

                var label = '';
                if(Node.label.length>8){
                    label = Node.label.slice(0,8)+'...';
                }else{
                    label = Node.label;
                }
                context.fillText(label,x+r,y+r);

            }
        }

        context.restore();
    }else{
        //zoom 操作，需要全部重新渲染
        for(var i=0;i<nodeDepartList.length;i++){
            var context = cache[i].getContext('2d');
            context.clearRect(0,0,this.element.width,this.element.height);
            context.save();
            context.translate(canvasObj.transform.x, canvasObj.transform.y);
            context.scale(canvasObj.transform.k, canvasObj.transform.k);
            var selectedNodes = selectedNodeDepartList[i];
            var nodes = nodeDepartList[i];
            if(selectedNodeDepartList[i].length>0){
                //绘制选中状态的点
                context.beginPath();
                context.lineWidth=10;
                context.strokeStyle = '#f65565';
                context.fillStyle = colorList[i];
                for(var m=0;m<selectedNodes.length;m++){
                    var Node = selectedNodes[m];
                    var x = Node.getX();
                    var y = Node.getY();
                    var r = Node.radius;

                    var radius =  Node.radius-5 ;
                    context.moveTo(x, y);
                    context.arc(x, y, radius, 0, 2 * Math.PI);
                }
                context.stroke();
                context.fill();

                if(canvasObj.transform.k>=1){
//画字
                    context.strokeWidth = 1;
                    context.font="16px 微软雅黑";
                    context.textAlign='left';
                    context.textBaseline='hanging';
                    for(var k=0;k<selectedNodes.length;k++){
                        var Node = selectedNodes[k];
                        var x = Node.getX();
                        var y = Node.getY();
                        var r = Node.radius;

                        var radius =  Node.radius-5 ;
                        var labelLength = context.measureText(Node.label).width+10;
                        context.fillStyle='#f65565';
                        context.fillRect(x+radius,y+radius,labelLength,20);

                        context.fillStyle = '#555';
                        var label = Node.label;
                        context.fillText(label,x+r,y+r);

                    }
                }


            }

            context.beginPath();
            context.lineWidth=1;
            context.strokeStyle = colorList[i];
            context.fillStyle = colorList[i];
            for(var n=0;n<nodes.length;n++){
                var Node = nodes[n];
                if(!Node.attr('selected')){
                    var x = Node.getX();
                    var y = Node.getY();
                    var r = Node.radius;


                    var radius = Node.radius;
                    context.fillStyle = Node.color;
                    context.strokeStyle=Node.color;

                    context.moveTo(x, y);

                    context.arc(x, y, radius, 0, 2 * Math.PI);
                }

            }
            context.stroke();
            context.fill();
            if(canvasObj.transform.k>=1) {
                context.beginPath();
                context.strokeWidth = 1;
                context.font="14px 微软雅黑";
                context.textAlign='left';
                context.textBaseline='hanging';
                context.fillStyle = '#555';
                for(var a=0;a<nodes.length;a++){
                    var Node = nodes[a];
                    var x = Node.getX();
                    var y = Node.getY();
                    var r = Node.radius;

                    var label = '';
                    var icon = FONT[nodes[a].icon];
                    console.log(icon);
                    if(Node.label.length>8){
                        label = Node.label.slice(0,8)+'...';
                    }else{
                        label = Node.label;
                    }
                    context.fillText(label,x+r,y+r);

                    context.font="14px fontawesome";
                    context.fillText(String.fromCharCode(parseInt(icon,16)),x,y);


                }
            }

            context.restore();
        }
    }






    this.nodesCache = cache;
    this.colorList = colorList;
    return this;










   /* //分开渲染，先渲染选中状态的node
    if(selectedNodes.length>0){
        context.beginPath();
        context.lineWidth=10;
        context.strokeStyle = '#f65565';
        for(var m=0;m<selectedNodes.length;m++){
            var Node = selectedNodes[m];
            var x = Node.getX();
            var y = Node.getY();
            var r = Node.radius;

            var radius =  Node.radius-5 ;
            context.fillStyle = Node.color;
            context.moveTo(x, y);
            context.arc(x, y, radius, 0, 2 * Math.PI);
        }
        context.stroke();
        context.fill();
    }

    //非选中状态node
    context.beginPath();
    context.lineWidth=1;
    for(var i=0;i<nodes.length;i++){
            var Node = nodes[i];
        if(!Node.attr('selected')){
            var x = Node.getX();
            var y = Node.getY();
            var r = Node.radius;


            var radius = Node.radius;
            context.fillStyle = Node.color;
            context.strokeStyle=Node.color;

            context.moveTo(x, y);

            context.arc(x, y, radius, 0, 2 * Math.PI);
        }

            // context.restore();
    }
    context.stroke();
    context.fill();

//画字
    context.beginPath();
    for(var k=0;k<nodes.length;k++){
        var Node = nodes[k];
        var x = Node.getX();
        var y = Node.getY();
        var r = Node.radius;

        //在点的旁边写对应文字
        if(Node.selected){
            //有点选状态
            var labelLength = context.measureText(Node.label).width+10;
            context.fillStyle='#f65565';
            context.fillRect(x+radius,y+radius,labelLength,20);
        }
        context.strokeWidth = 1;
        context.fillStyle = '#555';
        context.font="16px 微软雅黑";
        context.textAlign='left';
        context.textBaseline='hanging';
        var label = '';
        if(Node.selected){
            label = Node.label;
        }else{
            if(Node.label.length>8){
                label = Node.label.slice(0,8)+'...';
            }else{
                label = Node.label;
            }
        }
        context.fillText(label,x+r,y+r);
    }*/

}