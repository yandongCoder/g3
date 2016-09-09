import getStrLen from "../../utils/getStrLen";
import selected from "./selected";

export default function Node(data) {
    this.id = data.id;
    this.label = data.label;
    this.x = data.x;
    this.y = data.y;
    this._selected = false; //indicate whether node is select
}

Node.prototype = {
    constructor: Node,
    selected: selected,
    getId: function () {
        return this.id;
    },
    getX: function(){
        return this.x;
    },
    getY: function () {
        return this.y;
    },
    getLabelWidth: function(){
        return getStrLen(this.getLabel()) * 9;
    },
    getLabel: function(){
        return this.combinedLabel || this.label || "No Label";
    },
    getColor: function () {
        return this.color || "#123456";
    },
    getTranslate: function () {
        return "translate(" + this.x + "," + this.y + ")";
    }
};