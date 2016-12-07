import attr from "../../utils/attr";

function getX() {
    return this.x || 0;
}

function getY() {
    return this.y || 0;
}

export {attr, getX, getY};