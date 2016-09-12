import getStrLen from "../../utils/getStrLen";
import selected from "./selected";
import transformToLink from "./transformToLink";
import nudge from "./nudge";
import color from "./color";
import size from "./size";
import label from "./label";

//data: data obj, graph: graphInstance
export default function Node(data, graph) {
    this.graph = graph;
    this.id = data.id;
    this._label = data.label;
    this.x = data.x;
    this.y = data.y;
    this._size = data.size || graph._nodeSize;
    this._color = data.color;
    this._selected = false; //indicate whether node is select
}

Node.prototype = {
    constructor: Node,
    selected: selected,
    transformToLink: transformToLink,
    nudge: nudge,
    getId: function () {
        return this.id;
    },
    getX: function(){
        return this.x;
    },
    getY: function () {
        return this.y;
    },
    label: label,
    getLabelWidth: function(){
        return getStrLen(this.label()) * 9;
    },
    color: color,
    size: size,
    getTranslate: function () {
        return "translate(" + this.x + "," + this.y + ")";
    }

};