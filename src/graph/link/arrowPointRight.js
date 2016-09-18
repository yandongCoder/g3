export default function () {
    var coord = this.getTextCoordination();

    return (coord.Sx < coord.Tx && this.hasTargetArrow() && !this.hasSourceArrow())
        || ((coord.Sx > coord.Tx) && !this.hasTargetArrow() && this.hasSourceArrow());
}