import getOffsetCoordinate from "../../utils/getOffsetCoordinate";

//Link coordination is Node center's coordination or coordination where arrow placed, if any.
export default function () {

    var sourceR = this.source.radius() / 2;
    var targetR = this.target.radius() / 2;
    var arrowSize = this.width() * 3;

    var Sx = this.source.getX(),
        Sy = this.source.getY(),
        Tx = this.target.getX(),
        Ty = this.target.getY();


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