export default function (Node) {
    Node.getConnectedLinks().map(function (Link) {
        this._links.splice(this._links.indexOf(Link), 1);
    }, this);
}