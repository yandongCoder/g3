import getStrLen from "../../utils/getStrLen";
import selected from "./selected";
import transformed from "./transformed";
import nudge from "./nudge";
import color from "./color";
import radius from "./radius";
import label from "./label";
import {getX, getY} from "./getXY";
import NtoL from "./NtoL";
import getConnectedLinks from "./getConnectedLinks";
import remove from "./remove";
import grouped from "./grouped";
import ungroup from "./ungroup";
import getJSON from "./getJSON";

//data: data obj, graph: graphInstance
export default function Node(data, graph) {
    this.graph = graph;
    this.id = data.id;
    this._label = data.label || "";
    this.x = data.x || 0;
    this.y = data.y || 0;
    this._radius = data.radius || graph.config.radius;
    this._color = data.color || graph.config.color;
    this._selected = data.selected || false; //indicate whether node is select
    
    this._needTransformed = data.transformed || false;
    
    for (var prop in data) {
        if (data.hasOwnProperty(prop) && this[prop] === undefined) this[prop] = data[prop];
    }
}


Node.prototype = {
    constructor: Node,
    selected: selected,
    transformed: transformed,
    nudge: nudge,
    getX: getX,
    getY: getY,
    label: label,
    getLabelWidth: function(){
        return getStrLen(this.label()) * 9;
    },
    color: color,
    radius: radius,
    remove: remove,
    NtoL: NtoL,
    getConnectedLinks: getConnectedLinks,
    grouped: grouped,
    ungroup: ungroup,
    getJSON: getJSON
};