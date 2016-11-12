import {DIRECTION} from "../CONSTANT";

function getStartArrow() {
    if(this.direction() === DIRECTION.D2S || this.direction() === DIRECTION.DOUBLE)
        return "url(" + window.location.href.split('#')[0] + "#start-arrow)";
    else
        return "";
}

function getEndArrow () {
    if(this.direction() === DIRECTION.S2D || this.direction() === DIRECTION.DOUBLE)
        return "url(" + window.location.href.split('#')[0] + "#end-arrow)";
    else
        return "";
}

export {getStartArrow, getEndArrow};