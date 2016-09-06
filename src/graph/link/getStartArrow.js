import DIRECTION from "./direction";

export default function () {
    if(this.direction === DIRECTION.TO || this.direction === DIRECTION.DOUBLE){
        return "url(" + window.location.href.split('#')[0] + "#start-arrow)";
    }
}