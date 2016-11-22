import GroupedBy from "./helper/groupedBy";
import deriveNodeFromNodes from "../utils/deriveNodeFromNodes";

function group(filter) {
    var Nodes = this.getUngroupedNodes(filter);
    
    if(Nodes.length <= 1) return;

    var containLinks = this.getContainLinks(Nodes);
    var attachedLinks = this.getAttachedLinks(Nodes);
    var newNode = this._addNode(deriveNodeFromNodes(Nodes, this));
    
    newNode.groupedBy = new GroupedBy(newNode, Nodes, containLinks, attachedLinks);
    
    this.render();
    
    return newNode;
}

function groupBy(filter, iteratee) {
    var Nodes = this.getUngroupedNodes(filter);
    if(Nodes.length <= 1) return;
    
    var groupedNodes = _.chain(Nodes)
        .groupBy(iteratee)
        .toArray()
        .value();
    
    var newNodes = [];
    groupedNodes.forEach(function(item){
        var newNode = this.group(item);
        if(newNode) newNodes.push(newNode);
    }, this);
    return newNodes;
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