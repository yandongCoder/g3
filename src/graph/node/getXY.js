export function getX() {
    return this.x - this.radius();
}

export function getY() {
    return this.y - this.radius();
}

export function getTranslate () {
    return "translate(" + this.getX() + "," + this.getY() + ")";
}