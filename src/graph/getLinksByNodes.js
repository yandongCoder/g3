//nodes could be: Node, [Node], Node id string, Node id array of string
export default function (nodes) {
    var removedNodes = this.getNodes(nodes);
    return this._links.filter(function (Link) {
        return  (removedNodes.indexOf(Link.source) !== -1) || (removedNodes.indexOf(Link.target) !== -1);
    });
}