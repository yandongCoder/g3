import getNodeById from "../../utils/getNodeById";
import hasST from "./hasST";
import getPath from "./getPath";
import getStartArrow from "./getStartArrow";
import getEndArrow from "./getEndArrow";
import getTextCenter from "./getTextCenter";
import getLinkLabelTransform from "./getLinkLabelTransform";

export default function Link(data, nodes) {
    this.id = data.id;
    this.label = data.label;
    this.src = data.src;
    this.dst = data.dst;
    this.direction = data.direction === undefined? 1: data.direction;//0: none, 1: from, 2: to, 3 double

    this.source = getNodeById(this.src, nodes);
    this.target = getNodeById(this.dst, nodes);
}

Link.prototype = {
    constructor: Link,
    hasST: hasST,
    getPath: getPath,
    getStartArrow: getStartArrow,
    getEndArrow: getEndArrow,
    getTextCenter: getTextCenter,
    getLinkLabelTransform: getLinkLabelTransform,
    getId: function () {
        return this.id;
    },
    getLabel: function(){
        return this.combinedLabel || this.label || this.linkTypeName || 'No label';
    }
};