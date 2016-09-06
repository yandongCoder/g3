import getOffsetCoordinate from "../../utils/getOffsetCoordinate";
import DIRECTION from "./direction";

export default function (r, asSvgPathAttr) {
    var offset = getOffsetCoordinate(this.source.x, this.source.y, this.target.x, this.target.y, this.originalLinks ? this.originalLinks.length : 1);
    var halfR = r / 2;

    var Xs = this.source.x,
        Ys = this.source.y,
        Xd = this.target.x,
        Yd = this.target.y;

    if(this.direction === DIRECTION.TO || this.direction === DIRECTION.DOUBLE){
        Xs = offset.Xs;
        Ys = offset.Ys;
    }
    if(this.direction === DIRECTION.FROM || this.direction === DIRECTION.DOUBLE){
        Xd = offset.Xd;
        Yd = offset.Yd;
    }

    if(asSvgPathAttr)
        return 'M ' + (Xs + halfR) + ' ' + (Ys + halfR) + ' L ' + (Xd + halfR) + ' ' + (Yd + halfR);
    else
        return {
            Xs: Xs + halfR,
            Ys: Ys + halfR,
            Xd: Xd + halfR,
            Yd: Yd + halfR
        };
}