import getOffsetCoordinate from "../../utils/getOffsetCoordinate";

//Link coordination is Node center's coordination or coordination where arrow placed, if any.
export default function (forText) {

    var sourceOffset = this.source.radius();
    var targetOffset = this.target.radius();
    var arrowLength = this.width() * 3;

    var Sx = this.source.getX(),
        Sy = this.source.getY(),
        Tx = this.target.getX(),
        Ty = this.target.getY();


    if(this.hasSourceArrow()) sourceOffset += arrowLength;
    if(this.hasTargetArrow()) targetOffset += arrowLength;

    var offset = getOffsetCoordinate(Sx, Sy, Tx, Ty, sourceOffset, targetOffset);

    if(this.hasSourceArrow()){
        Sx = offset.Sx;
        Sy = offset.Sy;
    }
    if(this.hasTargetArrow()){
        Tx = offset.Tx;
        Ty = offset.Ty;
    }

    if(forText && (this.hasSourceArrow() || this.hasTargetArrow()) ){
        Sx = offset.Sx;
        Sy = offset.Sy;
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