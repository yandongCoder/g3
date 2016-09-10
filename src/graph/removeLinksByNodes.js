//nodes could be: Node, [Node], Node id string, Node id array of string
export default function (nodes) {
    this.getLinksByNodes(nodes).map(function (Link) {
        this._links.splice(this._links.indexOf(Link), 1);
    }, this);

}