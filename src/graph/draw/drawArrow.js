/**
 * Created by lcx on 2016/11/2.
 */
export default
function(ctx,link,lineWidth,x,y) {
    var targetLink = false;//标记当前link 是否为点击选中的link
    var s1 = link.source.getX();
    var e1 = link.source.getY();
    var s2 = link.target.getX();
    var e2 = link.target.getY();
    var r ,r1;
    function draw(e1, s1, e2, s2,tag) {
        var l = Math.sqrt((s2-s1)*(s2-s1) + (e2-e1)*(e2-e1));
        var sin = (e2-e1)/l;
        var cos = (s2-s1)/l;

        var dx = (r+lineWidth)*cos;
        var dy = (r+lineWidth)*sin;

        var sdx = (r1+lineWidth)*cos;
        var sdy = (r1+lineWidth)*sin;
        var res = {
            tag:tag
        };

        var x2,y2,x1,y1;
        x2 = s2-dx;
        y2 = e2-dy;
        x1 = s1+sdx;
        y1 = e1+sdy;

        /*var arrX1,arrY1,arrX2,arrY2;
        arrX2 = s2-(r+lineWidth*3)*cos;
        arrY2 = e2-(r+lineWidth*3)*sin;
        arrX1 = s1+(r1+lineWidth*3)*cos;
        arrY1 = e1+(r1+lineWidth*3)*sin;*/
        var targetArrow = calcArrow(x1,y1,x2,y2);
        var sourceArrow = calcArrow(x2,y2,x1,y1);
        x1 = round(x1);
        x2 = round(x2);
        y1 = round(y1);
        y2 = round(y2);
        targetArrow.a1 = round(targetArrow.a1);
        targetArrow.b1 = round(targetArrow.b1);
        targetArrow.a2 = round(targetArrow.a2);
        targetArrow.b2 = round(targetArrow.b2);
        sourceArrow.a1 = round(sourceArrow.a1);
        sourceArrow.b1 = round(sourceArrow.b1);
        sourceArrow.a2 = round(sourceArrow.a2);
        sourceArrow.b2 = round(sourceArrow.b2);
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        if(tag == 'double'){
            ctx.moveTo(targetArrow.a1,targetArrow.b1);
            ctx.lineTo(x2,y2);
            ctx.lineTo(targetArrow.a2,targetArrow.b2);

            ctx.moveTo(sourceArrow.a1,sourceArrow.b1);
            ctx.lineTo(x1,y1);
            ctx.lineTo(sourceArrow.a2,sourceArrow.b2);
        }else if(tag == 'source'){
            var sourceArrow = calcArrow(x1,y1,x2,y2);
            sourceArrow.a1 = round(sourceArrow.a1);
            sourceArrow.b1 = round(sourceArrow.b1);
            sourceArrow.a2 = round(sourceArrow.a2);
            sourceArrow.b2 = round(sourceArrow.b2);
            ctx.moveTo(sourceArrow.a1,sourceArrow.b1);
            ctx.lineTo(x2,y2);
            ctx.lineTo(sourceArrow.a2,sourceArrow.b2);
        }else if(tag == 'target'){
            ctx.moveTo(targetArrow.a1,targetArrow.b1);
            ctx.lineTo(x2,y2);
            ctx.lineTo(targetArrow.a2,targetArrow.b2);
        }
        return res;
    }

    if(link.hasSourceArrow() && link.hasTargetArrow()){
        //双箭头
        r = link.target.radius;
        r1 = link.source.radius;
        return draw(e1,s1,e2,s2,'double');
    }else if(link.hasSourceArrow()){
        r = link.source.radius;
        r1 = link.target.radius;
        //箭头指向source
        return draw(e2,s2,e1,s1,'source');
    }else if(link.hasTargetArrow()){
        r = link.target.radius;
        r1 = link.source.radius;
        //箭头指向target
        return draw(e1,s1,e2,s2,'target');
    }else{
        r = link.target.radius;
        r1 = link.source.radius;
        return draw(e1,s1,e2,s2,'none');
    }

    function round(somenum) {
        var rounded;
        rounded = (0.5 + somenum) | 0;
        rounded = ~~ (0.5 + somenum);
        rounded = (0.5 + somenum) << 0;
        return rounded;
    }

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


}