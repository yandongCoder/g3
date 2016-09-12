import getNodeById from "../../utils/getNodeById";
import hasST from "./hasST";
import getCoordination from "./getCoordination";
import getTextCoordination from "./getTextCoordination";
import getStartArrow from "./getStartArrow";
import getEndArrow from "./getEndArrow";
import getTextCenter from "./getTextCenter";
import getLinkLabelTransform from "./getLinkLabelTransform";
import transformToLink from "./transformToLink";
import label from "./label";
import width from "./width";
import DIRECTION from "./direction";

export default function Link(data, nodes, graph) {
    this.graph = graph;
    this.id = data.id;
    this._label = data.label;
    this._width = data.width || graph._linkWidth;
    this.src = data.src;
    this.dst = data.dst;
    this.direction = data.direction === undefined? 1: data.direction;//0: none, 1: from, 2: to, 3 double

    this.source = getNodeById(this.src, nodes);
    this.target = getNodeById(this.dst, nodes);
}

Link.prototype = {
    constructor: Link,
    hasST: hasST,
    transformToLink: transformToLink,
    getCoordination: getCoordination,
    getTextCoordination: getTextCoordination,
    getStartArrow: getStartArrow,
    getEndArrow: getEndArrow,
    getTextCenter: getTextCenter,
    getLinkLabelTransform: getLinkLabelTransform,
    label: label,
    width: width,
    hasSourceArrow: function(){
        return this.direction === DIRECTION.TO || this.direction === DIRECTION.DOUBLE;
    },
    hasTargetArrow: function(){
        return this.direction === DIRECTION.FROM || this.direction === DIRECTION.DOUBLE;
    },
    getId: function () {
        return this.id;
    },
};