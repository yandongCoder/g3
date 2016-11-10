import GroupedBy from "./helper/groupedBy";

import deriveNodeFromNodes from "../utils/deriveNodeFromNodes";

export default function (filter) {
    var Nodes = this.getUngroupedNodes(filter);
    
    if(Nodes.length <= 1) return;

    var containLinks = this.getContainLinks(Nodes);
    var attachedLinks = this.getAttachedLinks(Nodes);
    var newNode = this._addNode(deriveNodeFromNodes(Nodes));
    
    
    
    newNode.groupedBy = new GroupedBy(newNode, Nodes, containLinks, attachedLinks);
    
    this.render();
}