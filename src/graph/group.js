import GroupedBy from "./helper/groupedBy";
import deriveNodeFromNodes from "../utils/deriveNodeFromNodes";

function group(filter) {
    var Nodes = this.getUngroupedNodes(filter);
    
    if(Nodes.length <= 1) return;

    var containLinks = this.getContainLinks(Nodes);
    var attachedLinks = this.getAttachedLinks(Nodes);
    var newNode = this._addNode(deriveNodeFromNodes(Nodes));
    
    
    
    newNode.groupedBy = new GroupedBy(newNode, Nodes, containLinks, attachedLinks);
    
    this.render();
}

function groupBy(filter, iteratee) {
    var Nodes = this.getUngroupedNodes(filter);
    if(Nodes.length <= 1) return;
    
    var groupedNodes = _.chain(Nodes)
        .groupBy(iteratee)
        .toArray()
        .value();
    
    groupedNodes.forEach(function(item){
        this.group(item);
    }, this);
}

function flattenGroup(filter) {
    var Nodes = this.getUngroupedNodes(filter);
    
    if(Nodes.length <= 1) return;
    
    var ungroupedNodes = [];
    
    Nodes.forEach(function(Node){
        ungroupNode(Node);
    });
    
    this.group(ungroupedNodes);
    
    
    function ungroupNode (Node){
        if(Node.groupedBy){
            Node.ungroup();
            Node.groupedBy.nodes.forEach(function(Node){
                ungroupNode(Node);
            });
        }else{
            ungroupedNodes.push(Node);
        }
    }
}

export {group, groupBy, flattenGroup};