/**
 * Created by lcx on 2016/11/7.
 */
import drawCanvasLink from './drawCanvasLink';
import  drawCanvasNode from './drawCanvasNode';
export default function (canvasObj, x, y) {
    // console.log(links);
    var context = canvasObj.context;
    var target = null;
    function render(x,y) {
        context.clearRect(0, 0, canvasObj.canvas.width, canvasObj.canvas.height);
        context.save();
        context.translate(canvasObj.transform.x, canvasObj.transform.y);
        context.scale(canvasObj.transform.k, canvasObj.transform.k);
        target = drawCanvasLink(canvasObj,x,y);
        drawCanvasNode(canvasObj);
        context.restore();
    }
    render(x,y);
    console.log(target);
    return target;

}
