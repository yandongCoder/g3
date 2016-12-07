
/**
 * Created by lcx on 2016/11/1.
 * 利用canvas 画点 
 */
export default function (canvasObj) {
    var nodes = canvasObj.nodes;
    var context = canvasObj.context;

    nodes.forEach(function(Node) {
        var x = Node.getX();
        var y = Node.getY();
        var r = Node.radius;
        // console.log(Node.selected());
        context.beginPath();
        var radius = Node.selected ? Node.radius-5 : Node.radius;
        context.fillStyle = Node.color;
        context.moveTo(x, y);
        if(Node.selected){
            context.strokeStyle = '#f65565';
            context.lineWidth=10;
        }else{
            context.strokeStyle=Node.color;
            context.lineWidth=1;
        }
        
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.stroke();
        context.fill();

        //画字
        //在点的旁边写对应文字
        context.beginPath();
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

    });
}