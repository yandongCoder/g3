//nodes could be: Node, [Node], Node id string, Node id array of string
export default function (nodes) {
    var relatedLinks = this.getLinksByNodes(nodes);
    this.getNodes(nodes).forEach(function (Node) {
        Node.transformToLink();
    }, this);
}