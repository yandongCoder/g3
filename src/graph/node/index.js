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

//data: data obj, graph: graphInstance
export default function Node(data, graph) {
    this.graph = graph;

    //default
    this._radius = graph.config.radius;
    this._selected = data.selected || false; //indicate whether node is select
    this._needTransformed = false;
    
    for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
            switch (prop) {
                case "label":
                    this._label = data[prop];
                    break;
                case "radius":
                    this._radius = data.radius;
                    break;
                case "color":
                    this._color = data.color;
                    break;
                case "selected":
                    this._selected = data.selected;
                    break;
                case "transformed":
                    this._needTransformed = data.transformed;
                    break;
                default:
                    if(this[prop] === undefined) this[prop] = data[prop];
            }
        }
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
    getLabelWidth: function () {
        return getStrLen(this.label()) * 9;
    },
    color: color,
    radius: radius,
    remove: remove,
    NtoL: NtoL,
    getConnectedLinks: getConnectedLinks,
    grouped: grouped,
    ungroup: ungroup
};