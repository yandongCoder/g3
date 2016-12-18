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
    this.x = data.x;
    this.y = data.y;
    this.disabled = data.disabled || false;
    this.radius = data.radius || graph._config.radius;
    this.color = data.color || graph._config.color;
    this.icon = data.icon  || graph._config.icon;
    this.mugshot = data.mugshot || graph._config.mugshot;
    this.selected = data.selected || false;
    
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
    remove: remove,
    getConnectedLinks: getConnectedLinks
};
