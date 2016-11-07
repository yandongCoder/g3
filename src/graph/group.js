import deriveNodeFromNodes from "../utils/deriveNodeFromNodes";

export default function (filter) {
    var Nodes = this.getUngroupedNodes(filter);
    
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
        links: containLinks,
        attachedLinks: []
    };

    var attachedLinks = this.getAttachedLinks(Nodes);
    
    attachedLinks.forEach(function(Link){
        var attachedLink = {"link": Link};
        if(Nodes.indexOf(Link.source) !== -1) {
            attachedLink.originalSource = Link.source;
            Link.source = newNode;
        }
        if(Nodes.indexOf(Link.target) !== -1) {
            attachedLink.originalTarget = Link.target;
            Link.target = newNode;
        }
        newNode.groupedBy.attachedLinks.push(attachedLink);
    });
    
    this.render();
}