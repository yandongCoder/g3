/**
 * Created by lcx on 2016/11/2.
 */
export default function(ctx,link,lineWidth,x,y) {
    var targetLink = false;
    var s1 = link.source.getX();
    var e1 = link.source.getY();
    var s2 = link.target.getX();
    var e2 = link.target.getY();
    var r = link.target.radius;
    var text = link.label;

    //计算x2 y2,x1 y1 的坐标 因为若是带箭头的话，不能从两个圆圈的中心点出发去画
    var l = Math.sqrt((s2-s1)*(s2-s1) + (e2-e1)*(e2-e1));
    var sin = (e2-e1)/l;
    var cos = (s2-s1)/l;
    var xlen = (r+lineWidth)*cos;
    var ylen = (r+lineWidth)*sin;

    var dx = (r+lineWidth)*cos;
    var dy = (r+lineWidth)*sin;
    var x2 = s2-dx;
    var y2 = e2-dy;
    var x1 = s1+dx;
    var y1 = e1+dy;
    
    //进行箭头的绘制
    var angle = Math.abs(Math.atan((x2 - x1) / (y2 - y1))); //倾斜角余角
    var length = 10; //箭头斜线长度
    var degree = Math.PI / 6; //箭头倾斜角
    var theta = 0;
    var altha = 0;
    var a1 = 0;
    var b1 = 0;
    var a2 = 0;
    var b2 = 0;

    if (angle >= degree && angle <= Math.PI / 2 - degree) {
        theta = angle - degree;
        altha = Math.PI / 2 - 2 * degree - theta;
        if (x2 >= x1) {
            a1 = x2 - length * Math.sin(theta);
            a2 = x2 - length * Math.cos(altha);
        } else {
            a1 = x2 + length * Math.sin(theta);
            a2 = x2 + length * Math.cos(altha);
        }
        if (y2 >= y1) {
            b1 = y2 - length * Math.cos(theta);
            b2 = y2 - length * Math.sin(altha);
        } else {
            b1 = y2 + length * Math.cos(theta);
            b2 = y2 + length * Math.sin(altha);
        }
    } else {
        theta = angle - degree;
        altha = theta + 2 * degree - Math.PI / 2;
        if (x2 >= x1 && y2 >= y1) {
            a1 = x2 - length * Math.sin(theta);
            b1 = y2 - length * Math.cos(theta);
            a2 = x2 - length * Math.cos(altha);
            b2 = y2 + length * Math.sin(altha);
        } else if (x2 >= x1 && y2 < y1) {
            a1 = x2 - length * Math.sin(theta);
            b1 = y2 + length * Math.cos(theta);
            a2 = x2 - length * Math.cos(altha);
            b2 = y2 - length * Math.sin(altha);
        } else if (x2 < x1 && y2 < y1) {
            a1 = x2 + length * Math.sin(theta);
            b1 = y2 + length * Math.cos(theta);
            a2 = x2 + length * Math.cos(altha);
            b2 = y2 - length * Math.sin(altha);
        } else {
            a1 = x2 + length * Math.sin(theta);
            b1 = y2 - length * Math.cos(theta);
            a2 = x2 + length * Math.cos(altha);
            b2 = y2 + length * Math.sin(altha);
        }
    }

    ctx.beginPath();
    if(link.attr('selected')){
        ctx.strokeStyle = "#800";
    }else{
        ctx.strokeStyle = "#ccc";
    }
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 3;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    // ctx.lineTo(x1, y1);
   /* ctx.stroke();
    if(ctx.isPointInPath(x,y)){
        targetLink = true;
    }*/
    if(ctx.isPointInPath(x,y)){
        targetLink = true;
    }
    ctx.moveTo(a1, b1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(a2, b2);
    if(ctx.isPointInPath(x,y)){
        targetLink = true;
    }
    ctx.stroke();

    //绘制文字
    // ctx.beginPath();
    ctx.strokeWidth = 0;
    ctx.fillStyle = '#555';
    ctx.font="16px 微软雅黑";
    ctx.fillText(text,(s2+s1)/2,(e2+e1)/2);
    return targetLink;

}