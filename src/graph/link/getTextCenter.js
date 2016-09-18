import getStrLen from "../../utils/getStrLen";

export default function () {
    var coord = this.getTextCoordination();

    var x = Math.abs(coord.Tx - coord.Sx);
    var y = Math.abs(coord.Ty - coord.Sy);
    var z = Math.sqrt(x * x + y * y);

    var charLength = getStrLen(this.label()) * 6.6 / 2;

    var dx = z / 2 - charLength;

    //console.log(z);
    //console.log(dx);

    if (this.arrowPointRight()){
        return dx + this.source.radius();
    }else{
        return dx;
    }

}