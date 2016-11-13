import {DIRECTION} from "../CONSTANT";
import getStrLen from "../../utils/getStrLen";
import getOffsetCoordinate from "../../utils/getOffsetCoordinate";

var absUrl = window.location.href.split('#')[0];

function getStartArrow(status) {
    status = status? ("-" + status): "";
    if(this.selected()) status = "-selected";
    
    if(this.direction() === DIRECTION.D2S || this.direction() === DIRECTION.DOUBLE)
        return "url(" + absUrl + "#start-arrow"+ status +")";
    else
        return "";
}

function getEndArrow (status) {
    status = status? ("-" + status): "";
    if(this.selected()) status = "-selected";
    
    if(this.direction() === DIRECTION.S2D || this.direction() === DIRECTION.DOUBLE)
        return "url(" + absUrl + "#end-arrow"+ status +")";
    else
        return "";
}

function getTextOffset() {
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


function getLinkLabelTransform(scaleFactor) {
    var coord = this.getCoordination(true);
    var rx = (coord.Sx + coord.Tx) / 2;
    var ry = (coord.Sy + coord.Ty) / 2;
    
    
    if (coord.Tx < coord.Sx) {
        return 'rotate(180 ' + rx + ' ' + ry + ') translate(' + rx + ' ' + ry + ') scale(' + 1 / scaleFactor + ') translate(' + -rx + ' ' + -ry + ')';
        //先移动原点到字体位置，然后进行缩放，在将原点移回到初始位置
    } else {
        return 'translate(' + rx + ' ' + ry + ') scale(' + 1 / scaleFactor + ') translate(' + -rx + ' ' + -ry + ')';
    }
}

//Link coordination is Node center's coordination or coordination where arrow placed, if any.
function getCoordination(forText) {
    
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
    
    if(forText){
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

export {getStartArrow, getEndArrow, getTextOffset, getLinkLabelTransform, getCoordination};
