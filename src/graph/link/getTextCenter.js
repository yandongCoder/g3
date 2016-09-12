import getStrLen from "../../utils/getStrLen";

export default function () {
    var coord = this.getTextCoordination();

    var x = Math.abs(coord.Tx - coord.Sx);
    var y = Math.abs(coord.Ty - coord.Sy);
    var z = Math.sqrt(x * x + y * y);
    //console.log(this.label(),getStrLen(this.label()));
    var charLength = getStrLen(this.label()) * 6.6 / 2;


    var dx = z / 2 - charLength;
    if(this.hasSourceArrow() && (coord.Tx < coord.Sx) ){
        return dx + this.target.radius();
    }
    else if (this.hasTargetArrow() && (coord.Tx > coord.Sx)){
        return dx + this.source.radius();
    }else{
        return dx;
    }
}