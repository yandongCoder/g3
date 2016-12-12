/**
 * Created by lcx on 2016/11/2.
 */
export default function(ctx,link,lineWidth,x,y) {
    var targetLink = false;
    var s1 = link.source.getX();
    var e1 = link.source.getY();
    var s2 = link.target.getX();
    var e2 = link.target.getY();
    var text = link.label;
    var r ,r1;//r1 为source 的 半径

    // 判断哪个是source 哪个是target
    if(link.hasSourceArrow() && link.hasTargetArrow()){
        //双箭头
        r = link.target.radius;
        r1 = link.source.radius;
        draw(e1,s1,e2,s2,true);
    }else if(link.hasSourceArrow()){
        r = link.source.radius;
        r1 = link.target.radius;
        //箭头指向source
        draw(e2,s2,e1,s1);
    }else if(link.hasTargetArrow()){
        r = link.target.radius;
        r1 = link.source.radius;
        //箭头指向target
        draw(e1,s1,e2,s2);
    }

    function draw(e1, s1, e2, s2,isDouble) {
        //1  --- source   2  ----target
        var l = Math.sqrt((s2-s1)*(s2-s1) + (e2-e1)*(e2-e1));
        var sin = (e2-e1)/l;
        var cos = (s2-s1)/l;
        var xlen = (r+lineWidth)*cos;
        var ylen = (r+lineWidth)*sin;

        var dx = (r+lineWidth)*cos;
        var dy = (r+lineWidth)*sin;

        var sdx = (r1+lineWidth)*cos;
        var sdy = (r1+lineWidth)*sin;
        var x2,y2,x1,y1;
        x2 = s2-dx;
        y2 = e2-dy;
        x1 = s1+sdx;
        y1 = e1+sdy;

        var lineList = [];
        lineList.push([x2,y2]);
        if(!isDouble){
            var targetArrow = calcArrow(x1,y1,x2,y2);

            var x3 = (targetArrow.a1+targetArrow.a2)/2;
            var y3 = (targetArrow.b1+targetArrow.b2)/2;

            var a3 = (targetArrow.a1+x3)/2;
            var b3 = (targetArrow.b1+y3)/2;
            var a4 = (x3+targetArrow.a2)/2;
            var b4 = (y3+targetArrow.b2)/2;

            var a5 = a3-x3+x1;
            var b5 = b3-y3+y1;

            var a6 = a4-x3+x1;
            var b6 = b4-y3+y1;
            lineList.push([targetArrow.a1,targetArrow.b1]);
            lineList.push([a3,b3]);
            lineList.push([a5,b5]);
            lineList.push([x1,y1]);
            lineList.push([a6,b6]);
            lineList.push([a4,b4]);
            lineList.push([targetArrow.a2,targetArrow.b2]);

        }else{
            //双箭头
            var targetArrow = calcArrow(x1,y1,x2,y2);
            var sourceArrow = calcArrow(x2,y2,x1,y1);

            var x3 = (targetArrow.a1+targetArrow.a2)/2;
            var y3 = (targetArrow.b1+targetArrow.b2)/2;

            var x4 = (sourceArrow.a1+sourceArrow.a2)/2;
            var y4 = (sourceArrow.b1+sourceArrow.b2)/2;

            var a3 = (targetArrow.a1+x3)/2;
            var b3 = (targetArrow.b1+y3)/2;
            var a4 = (targetArrow.a2+x3)/2;
            var b4 = (targetArrow.b2+y3)/2;

            var a5 = (sourceArrow.a1+x4)/2;
            var b5 = (sourceArrow.b1+y4)/2;
            var a6 = (sourceArrow.a2+x4)/2;
            var b6 = (sourceArrow.b2+y4)/2;
            lineList.push([targetArrow.a1,targetArrow.b1]);
            lineList.push([a3,b3]);
            lineList.push([a6,b6]);
            lineList.push([sourceArrow.a1,sourceArrow.b1]);
            lineList.push([x1,y1]);
            lineList.push([sourceArrow.a2,sourceArrow.b2]);
            lineList.push([a5,b5]);
            lineList.push([a4,b4]);
            lineList.push([targetArrow.a2,targetArrow.b2]);
        }

        lineList.push([x2,y2]);

        ctx.beginPath();
        if(link.attr('selected')){
            ctx.fillStyle = "#f00";
        }else{
            ctx.fillStyle = "#ccc";
        }
        ctx.lineWidth = 3;
        ctx.moveTo(lineList[0][0],lineList[0][1]);
        for(var i=1;i<lineList.length;i++){
            ctx.lineTo(lineList[i][0],lineList[i][1]);
        }
        if(ctx.isPointInPath(x,y)){
            targetLink = true;
        }
        ctx.fill();

        //绘制文字
        // ctx.beginPath();
        ctx.strokeWidth = 0;
        ctx.fillStyle = '#555';
        ctx.font="16px 微软雅黑";
        ctx.fillText(text,(s2+s1)/2,(e2+e1)/2);
    }

    //计算箭头两端坐标
    function calcArrow(x1, y1, x2, y2) {
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
        //a1，b1  求箭头的坐标

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
        return {
            a1:a1,
            b1:b1,
            a2:a2,
            b2:b2
        };
    }
    return targetLink;

}