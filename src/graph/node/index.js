export default function Node(data) {
    this.id = data.id;
    this.x = data.x;
    this.y = data.y;
}

Node.prototype = {
    constructor: Node,
    getId: function () {
        return this.id;
    },
    getColor: function () {
        return this.color || "#123456";
    },
    getTranslate: function () {
        return "translate(" + this.x + "," + this.y + ")";
    }
};