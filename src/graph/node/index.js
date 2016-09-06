import getStrLen from "../../utils/getStrLen";

export default function Node(data) {
    this.id = data.id;
    this.label = data.label;
    this.x = data.x;
    this.y = data.y;
}

Node.prototype = {
    constructor: Node,
    getId: function () {
        return this.id;
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