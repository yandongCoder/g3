import deriveNodeFromNodes from "../utils/deriveNodeFromNodes";

export default function (Nodes) {

    Nodes = Nodes.filter(function(Node){ return !Node.grouped() });
    if(Nodes.length <= 1) return;

    Nodes.forEach(function(Node){
        Node.grouped(true);
    });

    var containLinks = this.getContainLinks(Nodes);
    containLinks.forEach(function(Link){
        Link.grouped(true);
    });

    var newNode = this._addNode(deriveNodeFromNodes(Nodes));

    newNode.groupedBy = {
        nodes: Nodes,
        links: containLinks
    };

    var attachedLinks = this.getAttachedLinks(Nodes);
    attachedLinks.forEach(function(Link){
        if(Nodes.indexOf(Link.source) !== -1) Link.source = newNode;
        if(Nodes.indexOf(Link.target) !== -1) Link.target = newNode;
    });

    this.render();
}