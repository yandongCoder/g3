import hasST from "./hasST";
import getCoordination from "./getCoordination";
import {getStartArrow, getEndArrow} from "./getArrow";
import getTextOffset from "./getTextOffset";
import getLinkLabelTransform from "./getLinkLabelTransform";
import transformed from "./transformed";
import label from "./label";
import width from "./width";
import color from "./color";
import direction from "./direction";
import {DIRECTION} from "../CONSTANT";
import remove from "./remove";
import merged from "./merged";
import merge from "./merge";
import flattenMerge from "./flattenMerge";
import unmerge from "./unmerge";
import getHomoLinks from "./getHomoLinks";
import LtoN from "./LtoN";
import NtoL from "./NtoL";
import grouped from "./grouped";
import getJSON from "./getJSON";
import selected from "./selected";

export default function Link(data, graph) {
    this.graph = graph;
    this.id = data.id;
    this._label = data.label || "";
    this._width = data.width || (graph && graph.config.linkWidth);
    this._color = data.color || "#a1a1a1";
    this._selected = data.selected || false;
    this.src = data.src;
    this.dst = data.dst;
    this._direction = data.direction === undefined? 1: data.direction;//0: none, 1: from, 2: to, 3 double

    this.source = graph && this.graph._nodesHash[this.src];
    this.target = graph && this.graph._nodesHash[this.dst];
    
    if(data.grouped) this._grouped = data.grouped;
    if(data.merged) this._merged = data.merged;
    //this._needMerged = data.merged || false;

    if(data.mergedBy) this.mergedBy = data.mergedBy;
    if(data.transformedBy) this.transformedBy = data.transformedBy;
    
    for (var prop in data) {
        if (data.hasOwnProperty(prop) && this[prop] === undefined) this[prop] = data[prop];
    }
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
    getJSON: getJSON,
    label: label,
    width: width,
    selected: selected,
    remove: remove,
    merged: merged,
    merge: merge,
    flattenMerge: flattenMerge,
    unmerge: unmerge,
    grouped: grouped,
    LtoN: LtoN,
    NtoL: NtoL,
    color: color,
    direction: direction,
    getHomoLinks: getHomoLinks,
    hasSourceArrow: function(){
        return this.direction() === DIRECTION.D2S || this.direction() === DIRECTION.DOUBLE;
    },
    hasTargetArrow: function(){
        return this.direction() === DIRECTION.S2D || this.direction() === DIRECTION.DOUBLE;
    }
};