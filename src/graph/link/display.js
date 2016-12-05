import {DIRECTION} from "../CONSTANT";
import getOffsetCoordinate from "../../utils/getOffsetCoordinate";

var absUrl = window.location.href.split('#')[0];

function getStartArrow(status) {
    status = status? ("-" + status): "";
    if(this.attr("selected")) status = "-selected";
    
    if(this.attr("direction") === DIRECTION.D2S || this.attr("direction") === DIRECTION.DOUBLE)
        return "url(" + absUrl + "#start-arrow"+ status +")";
    else
        return "";
}

function getEndArrow (status) {
    status = status? ("-" + status): "";
    if(this.attr("selected")) status = "-selected";
    
    if(this.attr("direction") === DIRECTION.S2D || this.attr("direction") === DIRECTION.DOUBLE)
        return "url(" + absUrl + "#end-arrow"+ status +")";
    else
        return "";
}

function LineWidth(scale){
    var c = this.getCoordination(true);
    var x = c.Tx - c.Sx;
    var y = c.Ty - c.Sy;
    var z = Math.sqrt(x*x + y*y) * scale;
    
    return z;
}

function LineHeight(scale) {
    return this.attr("width") * scale;
}

function getLinkInfoTransform(scale) {
    var c = this.getCoordination(true);
    var rx = (c.Sx + c.Tx) / 2;
    var ry = (c.Sy + c.Ty) / 2;
    
    var x = c.Tx - c.Sx;
    var y = c.Ty - c.Sy;

    var radians =  Math.atan2(y, x) || 0;
    if (radians < 0) radians += 2 * Math.PI;
    var degrees = radians * 180 / Math.PI;
    if(degrees > 90 && degrees < 270) degrees -= 180;
    
    var transform  = 'rotate('+ degrees +' '+ rx +' '+ ry +') translate(' + rx + ' ' + ry + ') scale(' + 1 / scale + ')' + '';
    
    var offsetX =  - this.LineWidth(scale) / 2;
    var offsetY =  this.LineHeight(scale) / 2 + 5;
    transform += ' translate('+ offsetX +' '+ offsetY +')';
    
    return transform;
}

//Link coordination is Node center's coordination or coordination where arrow placed, if any.
function getCoordination(forText) {
    
    var sourceOffset = this.source.attr("radius");
    var targetOffset = this.target.attr("radius");
    var arrowLength = this.attr("width") * 3;
    
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

export {getStartArrow, LineWidth, LineHeight, getEndArrow, getLinkInfoTransform, getCoordination};