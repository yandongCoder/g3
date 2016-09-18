import getStrLen from "../../utils/getStrLen";

export default function () {
    var self = this;
    var coord = this.getCoordination(true);

    var x = Math.abs(coord.Tx - coord.Sx);
    var y = Math.abs(coord.Ty - coord.Sy);
    var z = Math.sqrt(x * x + y * y);

    var charLength = getStrLen(this.label()) * 6.6 / 2;

    var dx = z / 2 - charLength;
    
    return dx + textLeftOffset();

    function textLeftOffset(){
        if((self.hasTargetArrow() && !self.hasSourceArrow()) || (!self.hasTargetArrow() && !self.hasSourceArrow())) return self.source.radius();
        //else if(!self.hasTargetArrow() && self.hasSourceArrow()) return self.target.radius();
        else return 0;
    }
}