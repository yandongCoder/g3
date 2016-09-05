import getOffsetEndCoordinate from "../../utils/getOffsetEndCoordinate";

export default function (r) {
    var offset = getOffsetEndCoordinate(this.source.x, this.source.y, this.target.x, this.target.y, this.originalLinks ? this.originalLinks.length : 1);
    var halfR = r / 2;

    return 'M ' + (this.source.x + halfR) + ' ' + (this.source.y + halfR) + ' L ' + (offset.x + halfR) + ' ' + (offset.y + halfR);
}