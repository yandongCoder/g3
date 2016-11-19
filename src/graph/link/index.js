import hasST from "./hasST";
import {getStartArrow, getEndArrow, getTextOffset, getLinkLabelTransform, getCoordination} from "./display";
import {color, disabled, direction, label, selected, width, getSourceId, getTargetId, changeSource, changeTarget, merged, grouped, transformed} from "./attributes";
import {DIRECTION} from "../CONSTANT";
import remove from "./remove";
import {merge, flattenMerge, unmerge} from "./merge";
import getHomoLinks from "./getHomoLinks";
import {LtoN, NtoL} from "./L2N_N2L";
import getJSON from "./getJSON";

export default function Link(data, graph) {
    this.graph = graph;
    this.id = data.id;
    this._label = data.label || "";
    this._width = data.width || (graph && graph._config.linkWidth);
    this._color = data.color || (graph && graph._config.linkColor);
    this._selected = data.selected || false;
    this._direction = data.direction === undefined? 1: data.direction;//0: none, 1: from, 2: to, 3 double
    this._disabled = data.disabled || false;

    this.source = graph && this.graph._nodesHash[data.src];
    this.target = graph && this.graph._nodesHash[data.dst];
    
    if(data.grouped) this._grouped = data.grouped;
    if(data.merged) this._merged = data.merged;
    //this._needMerged = data.merged || false;

    if(data.mergedBy) this.mergedBy = data.mergedBy;
    if(data.transformedBy) this.transformedBy = data.transformedBy;
    
    var exceptKey = ['src', 'dst'];
    for (var prop in data) {
        if (data.hasOwnProperty(prop) && this[prop] === undefined && exceptKey.indexOf(prop) === -1) this[prop] = data[prop];
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
    disabled: disabled,
    remove: remove,
    getSourceId: getSourceId,
    getTargetId: getTargetId,
    changeSource: changeSource,
    changeTarget: changeTarget,
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
