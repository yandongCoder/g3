import getNodeById from "../../utils/getNodeById";
import hasST from "./hasST";
import getPath from "./getPath";
import getStartArrow from "./getStartArrow";
import getEndArrow from "./getEndArrow";

export default function Link(data, nodes) {
    this.id = data.id;
    this.label = data.label;
    this.src = data.src;
    this.dst = data.dst;

    this.source = getNodeById(this.src, nodes);
    this.target = getNodeById(this.dst, nodes);
}

Link.prototype = {
    constructor: Link,
    hasST: hasST,
    getPath: getPath,
    getStartArrow: getStartArrow,
    getEndArrow: getEndArrow

};