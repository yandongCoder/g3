
/**
 * Created by lcx on 2016/11/1.
 * 利用canvas 画点 
 */
import {COLOR,FONT} from "../CONSTANT";
export default function (canvasObj) {
    var nodes = this.getRenderedNodes();
    // var context = canvasObj.context;
    //对node 进行分类 按颜色进行分类 不同的颜色画在不同的画布上，但是所有点的总共的颜色不宜过多 否则在点线多的情况下会影响整体效率
    var colorList = [];
    var nodeDepartList = [];
    var selectedNodeDepartList = [];
    var cache = [];
    var selectedNodes = this.getSelectedNodes();
    for(var j=0;j<nodes.length;j++){
        if(nodes[j].color){
            if(colorList.indexOf(nodes[j].color)<0){
                colorList.push(nodes[j].color);
                nodeDepartList.push([nodes[j]]);
                selectedNodeDepartList.push([]);
                var canvas = document.createElement('canvas');
                canvas.width = this.element.width;
                canvas.height = this.element.height;
                cache.push(canvas);
            }else{
                var index = colorList.indexOf(nodes[j].color);
                nodeDepartList[index].push(nodes[j]);
            }
        }else{
            if(colorList.indexOf(COLOR)<0){
                colorList.push(COLOR);
                nodeDepartList.push([nodes[j]]);
                selectedNodeDepartList.push([]);
                var canvas = document.createElement('canvas');
                canvas.width = this.element.width;
                canvas.height = this.element.height;
                cache.push(canvas);
            }else{
                var index = colorList.indexOf(COLOR);
                nodeDepartList[index].push(nodes[j]);
            }
        }

    }
    for(var l=0;l<selectedNodes.length;l++){
        if(selectedNodes[l].color){
            var index = colorList.indexOf(selectedNodes[l].color);
            selectedNodeDepartList[index].push(selectedNodes[l]);
        }else{
            var index = colorList.indexOf(COLOR);
            selectedNodeDepartList[index].push(selectedNodes[l]);
        }

    }

    for(var i=0;i<nodeDepartList.length;i++){
        var context = cache[i].getContext('2d');
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

        context.strokeWidth = 1;
        context.font="16px 微软雅黑";
        context.textAlign='left';
        context.textBaseline='hanging';
        context.fillStyle = '#555';
        for(var a=0;a<selectedNodes.length;a++){
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

    this.nodesCache = cache;
    this.colorList = colorList;
    this.nodesDepartList = nodeDepartList;
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