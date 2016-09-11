
export default function (scaleFactor) {
    var coord = this.getCoordination();
    var rx = (coord.Sx + coord.Tx) / 2;
    var ry = (coord.Sy + coord.Ty) / 2;

    if (coord.Xd < coord.Xs) {
        return 'rotate(180 ' + rx + ' ' + ry + ') translate(' + rx + ' ' + ry + ') scale(' + 1 / scaleFactor + ') translate(' + -rx + ' ' + -ry + ')';
        //先移动原点到字体位置，然后进行缩放，在将原点移回到初始位置
    } else {
        return 'translate(' + rx + ' ' + ry + ') scale(' + 1 / scaleFactor + ') translate(' + -rx + ' ' + -ry + ')';
    }
}