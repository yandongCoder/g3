import getStrLen from "../../utils/getStrLen";

export default function () {
    var coord = this.getTextCoordination();

    var x = Math.abs(coord.Sx - coord.Tx);
    var y = Math.abs(coord.Sy - coord.Ty);
    var z = Math.sqrt(x * x + y * y);
    //console.log(this.label(),getStrLen(this.label()));
    var charLength = getStrLen(this.label()) * 6.6 / 2;

    //字长度
    return z / 2 - charLength;
}