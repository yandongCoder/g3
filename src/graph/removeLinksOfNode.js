export default function (Node) {
    Node.getConnectedLinks().map(function (Link) {
        Link.remove();
    }, this);
}