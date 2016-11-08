import {DIRECTION} from "./CONSTANT";

export default function () {
    if(this.direction() === DIRECTION.S2D || this.direction() === DIRECTION.DOUBLE)
        return "url(" + window.location.href.split('#')[0] + "#end-arrow)";
    else
        return "";
}