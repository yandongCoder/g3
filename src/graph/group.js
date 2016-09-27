import deriveNodeFromNodes from "../utils/deriveNodeFromNodes";

export default function (Nodes) {

    var containLinks = this.getContainLinks(Nodes);
    Nodes.forEach(function(Node){
        Node.grouped(true);
    });

    containLinks.forEach(function(Link){
        Link.grouped(true);
    });

    var newNode = deriveNodeFromNodes(Nodes);

    this._addNode(newNode);

    this.render();
}