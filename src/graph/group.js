import GroupedBy from "./node/GroupedBy";

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
    
    var attachedLinks = this.getAttachedLinks(Nodes);
    
    newNode.groupedBy = new GroupedBy(newNode, Nodes, containLinks, attachedLinks);
    
    this.render();
}