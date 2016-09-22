import getNodeById from "../../utils/filterById";
import hasST from "./hasST";
import getCoordination from "./getCoordination";
import getStartArrow from "./getStartArrow";
import getEndArrow from "./getEndArrow";
import getTextOffset from "./getTextOffset";
import getLinkLabelTransform from "./getLinkLabelTransform";
import transformed from "./transformed";
import label from "./label";
import width from "./width";
import color from "./color";
import direction from "./direction";
import DIRECTION from "./DIRECTION-CONSTANT";
import remove from "./remove";
import merged from "./merged";
import merge from "./merge";
import unmerge from "./unmerge";
import getHomoLinks from "./getHomoLinks";

export default function Link(data, nodes, graph) {
    this.graph = graph;
    this.id = data.id;
    this._label = data.label || "";
    this._width = data.width || graph._linkWidth || 3;
    this._color = data.color || "#a1a1a1";
    this.src = data.src;
    this.dst = data.dst;
    this._direction = data.direction === undefined? 1: data.direction;//0: none, 1: from, 2: to, 3 double

    this.source = getNodeById(this.src, nodes);
    this.target = getNodeById(this.dst, nodes);

    this._merged = data.merged || false;
    this.mergedBy = data.mergedBy;
}


Link.prototype = {
    constructor: Link,
    hasST: hasST,
    transformed: transformed,
    getCoordination: getCoordination,
    getStartArrow: getStartArrow,
    getEndArrow: getEndArrow,
    getTextOffset: getTextOffset,
    getLinkLabelTransform: getLinkLabelTransform,
    label: label,
    width: width,
    remove: remove,
    merged: merged,
    merge: merge,
    unmerge: unmerge,
    color: color,
    direction: direction,
    getHomoLinks: getHomoLinks,
    hasSourceArrow: function(){
        return this.direction() === DIRECTION.TO || this.direction() === DIRECTION.DOUBLE;
    },
    hasTargetArrow: function(){
        return this.direction() === DIRECTION.FROM || this.direction() === DIRECTION.DOUBLE;
    }
};