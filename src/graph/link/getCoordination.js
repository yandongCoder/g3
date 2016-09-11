import getOffsetCoordinate from "../../utils/getOffsetCoordinate";

export default function () {

    var sourceR = this.source.size() / 2;
    var targetR = this.target.size() / 2;
    var arrowSize = 10;

    var Xs = this.source.x + sourceR,
        Ys = this.source.y + sourceR,
        Xd = this.target.x + targetR,
        Yd = this.target.y + targetR;


    var offset = getOffsetCoordinate(Xs, Ys, Xd, Yd, sourceR + arrowSize, targetR + arrowSize);


    if(this.hasSourceArrow()){
        Xs = offset.Xs;
        Ys = offset.Ys;
    }
    if(this.hasTargetArrow()){
        Xd = offset.Xd;
        Yd = offset.Yd;
    }

    return {
        Sx: Xs,
        Sy: Ys,
        Tx: Xd,
        Ty: Yd
    };
}