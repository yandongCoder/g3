import DIRECTION from "./direction";

export default function () {
    if(this.direction === DIRECTION.FROM || this.direction === DIRECTION.DOUBLE){
        return "url(" + window.location.href.split('#')[0] + "#end-arrow)";
    }
}