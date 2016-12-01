/**
 * Created by lcx on 2016/11/1.
 */
export default function(canvas,x, y) {
    // var canvas = this._canvas;
    var res = {};
    var cBox = canvas.getBoundingClientRect();
    var cx = cBox.left;
    var cy = cBox.top;
    res.x = x - cx;
    res.y = y - cy;
    return res;
}