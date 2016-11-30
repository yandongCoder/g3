import getStrLen from "../../utils/getStrLen";
import {attr, getX, getY} from "./attributes";
import nudge from "./nudge";
import getConnectedLinks from "./getConnectedLinks";
import remove from "./remove";


//data: data obj, graph: graphInstance
export default function Node(data, graph) {
    this.graph = graph;
    this.id = data.id;
    this.label = data.label || "";
    this.x = data.x || 0;
    this.y = data.y || 0;
    this.disabled = data.disabled || false;
    this.radius = data.radius || graph._config.radius;
    this.color = data.color || graph._config.color;
    this.icon = data.icon  || graph._config.icon;
    this.mugshot = data.mugshot || graph._config.mugshot;
    this.selected = data.selected || false; //indicate whether node is select
    if(data.grouped) this._grouped = data.grouped;
    
    for (var prop in data) {
        if (data.hasOwnProperty(prop) && this[prop] === undefined) this[prop] = data[prop];
    }
}

Node.prototype = {
    constructor: Node,
    _nudge: nudge,
    attr: attr,
    getX: getX,
    getY: getY,
    getLabelWidth: function(){
        return getStrLen(this.attr("label")) * 9;
    },
    remove: remove,
    getConnectedLinks: getConnectedLinks
};
