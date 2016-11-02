import DIRECTION from "./DIRECTION-CONSTANT";

export default function () {
    if(this.direction() === DIRECTION.D2S || this.direction() === DIRECTION.DOUBLE)
        return "url(" + window.location.href.split('#')[0] + "#start-arrow)";
    else
        return "";
}