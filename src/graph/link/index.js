import hasST from "./hasST";
import {getStartArrow, getEndArrow, LineWidth, LineHeight, getLinkInfoTransform, getCoordination} from "./display";
import {attr, getSourceId, getTargetId, changeSource, changeTarget, merged, grouped, transformed} from "./attributes";
import {DIRECTION} from "../CONSTANT";
import remove from "./remove";
import getHomoLinks from "./getHomoLinks";

export default function Link(data, graph) {
    this.graph = graph;
    this.id = data.id;
    this._label = data.label || "";
    this._width = data.width || (graph && graph._config.linkWidth);
    this._color = data.color || (graph && graph._config.linkColor);
    this._icon = data.icon  || graph._config.icon;
    this._mugshot = data.mugshot || graph._config.mugshot;
    this._selected = data.selected || false;
    this._direction = data.direction === undefined? 1: data.direction;//0: none, 1: from, 2: to, 3 double
    this._disabled = data.disabled || false;
    this._hide = data.hide || false;

    this.source = graph && this.graph._nodesHash[data.src];
    this.target = graph && this.graph._nodesHash[data.dst];
    
    
    var exceptKey = ['src', 'dst'];
    for (var prop in data) {
        if (data.hasOwnProperty(prop) && this[prop] === undefined && exceptKey.indexOf(prop) === -1) this[prop] = data[prop];
    }
}

Link.prototype = {
    constructor: Link,
    hasST: hasST,
    getCoordination: getCoordination,
    getStartArrow: getStartArrow,
    getEndArrow: getEndArrow,
    LineWidth: LineWidth,
    LineHeight: LineHeight,
    getLinkInfoTransform: getLinkInfoTransform,
    attr: attr,
    remove: remove,
    getSourceId: getSourceId,
    getTargetId: getTargetId,
    changeSource: changeSource,
    changeTarget: changeTarget,
    getHomoLinks: getHomoLinks,
    hasSourceArrow: function(){
        return this.attr("direction") === DIRECTION.D2S || this.attr("direction") === DIRECTION.DOUBLE;
    },
    hasTargetArrow: function(){
        return this.attr("direction") === DIRECTION.S2D || this.attr("direction") === DIRECTION.DOUBLE;
    }
};
