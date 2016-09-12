import getOffsetCoordinate from "../../utils/getOffsetCoordinate";

//Link coordination is Node center's coordination or coordination where arrow placed, if any.
export default function () {

    var sourceR = this.source.size() / 2;
    var targetR = this.target.size() / 2;
    var arrowSize = this.width() * 3;

    var Sx = this.source.x + sourceR,
        Sy = this.source.y + sourceR,
        Tx = this.target.x + targetR,
        Ty = this.target.y + targetR;


    var offset = getOffsetCoordinate(Sx, Sy, Tx, Ty, sourceR + arrowSize, targetR + arrowSize);


    if(this.hasSourceArrow()){
        Sx = offset.Sx;
        Sy = offset.Sy;
    }
    if(this.hasTargetArrow()){
        Tx = offset.Tx;
        Ty = offset.Ty;
    }

    return {
        Sx: Sx,
        Sy: Sy,
        Tx: Tx,
        Ty: Ty
    };
}