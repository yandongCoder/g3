import getStrLen from "../../utils/getStrLen";
import {attr, grouped, transformed, getX, getY} from "./attributes";
import nudge from "./nudge";
import NtoL from "./NtoL";
import getConnectedLinks from "./getConnectedLinks";
import remove from "./remove";
import ungroup from "./ungroup";
import getJSON from "./getJSON";


//data: data obj, graph: graphInstance
export default function Node(data, graph) {
    this.graph = graph;
    this.id = data.id;
    this._label = data.label || "";
    this.x = data.x || 0;
    this.y = data.y || 0;
    this._disabled = data.disabled || false;
    this._radius = data.radius || graph._config.radius;
    this._color = data.color || graph._config.color;
    this._icon = data.icon  || graph._config.icon;
    this._mugshot = data.mugshot || graph._config.mugshot;
    this._selected = data.selected || false; //indicate whether node is select
    if(data.grouped) this._grouped = data.grouped;
    
    for (var prop in data) {
        if (data.hasOwnProperty(prop) && this[prop] === undefined) this[prop] = data[prop];
    }
}

Node.prototype = {
    constructor: Node,
    transformed: transformed,
    _nudge: nudge,
    attr: attr,
    getX: getX,
    getY: getY,
    getLabelWidth: function(){
        return getStrLen(this.attr("label")) * 9;
    },
    remove: remove,
    NtoL: NtoL,
    getConnectedLinks: getConnectedLinks,
    grouped: grouped,
    ungroup: ungroup,
    getJSON: getJSON
};