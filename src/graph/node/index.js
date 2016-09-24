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

//data: data obj, graph: graphInstance
export default function Node(data, graph) {
    this.graph = graph;
    this.id = data.id;
    this._label = data.label;
    this.x = data.x;
    this.y = data.y;
    this._radius = data.radius || graph._radius;
    this._color = data.color;
    this._selected = data.selected || false; //indicate whether node is select
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
    getConnectedLinks: getConnectedLinks
};