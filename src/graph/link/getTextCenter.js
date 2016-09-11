import getStrLen from "../../utils/getStrLen";

export default function () {
    var coord = this.getCoordination();

    // if(this.direction === DIRECTION.TO || this.direction === DIRECTION.DOUBLE){
    //     Xs = offset.Xs;
    //     Ys = offset.Ys;
    // }
    // if(this.direction === DIRECTION.FROM || this.direction === DIRECTION.DOUBLE){
    //     Xd = offset.Xd;
    //     Yd = offset.Yd;
    // }

    var x = Math.abs(coord.Sx - coord.Tx);
    var y = Math.abs(coord.Sy - coord.Ty);
    var z = Math.sqrt(x * x + y * y);
    var charLength = getStrLen(this.label()) * 6 / 2;
    //字长度
    return z / 2 - charLength;
}