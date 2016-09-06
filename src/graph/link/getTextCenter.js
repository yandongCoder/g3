import getStrLen from "../../utils/getStrLen";

export default function (pathCoord) {

    var x = Math.abs(pathCoord.Xs - pathCoord.Xd);
    var y = Math.abs(pathCoord.Ys - pathCoord.Yd);
    var z = Math.sqrt(x * x + y * y);
    var charLength = getStrLen(this.getLabel()) * 6 / 2;
    //字长度
    return z / 2 - charLength;
}