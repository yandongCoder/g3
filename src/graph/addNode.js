import Node from "./node/index";

export default function (obj) {
    var node = new Node(obj);
    if(!this.hasNode(node)) this._nodes.push(node);
}
