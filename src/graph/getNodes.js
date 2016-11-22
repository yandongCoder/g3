import filterBy from "../utils/filterBy";
import {DIRECTION} from "./CONSTANT";

function getNodes(filter) {
    return filterBy(filter, this._nodes);
}

function getRenderedNodes() {
    return this.getNodes(function(Node){
        return !Node.transformed() && !Node.grouped();
    });
}

function getSelectedNodes() {
    return this.getNodes(function(Node){
        return Node.attr("selected");
    });
}

function getDisabledNodes() {
    return this.getNodes(function(Node){
        return Node.attr("disabled");
    });
}

function getInvertedNodes(filter) {
    var Nodes = this.getNodes(filter);
    return this.getRenderedNodes().filter(function(Node){
        return Nodes.indexOf(Node) === -1;
    });
}

function getUngroupedNodes(filter) {
    return this.getNodes(filter)
        .filter(function(Node){ return !Node.grouped() });
}

function getLinkedNodes(filter, type) {
    var Nodes = this.getNodes(filter);
    
    var relatedNodes = [];
    
    this.getRenderedLinks().forEach(function (Link) {
        if(type === 'none' && Link.attr("direction") !== DIRECTION.NONE) return;
        if(type === 'double' && Link.attr("direction") !== DIRECTION.DOUBLE) return;
        if (Nodes.indexOf(Link.source) !== -1) {
            if(type === 'in' && Link.attr("direction") !== DIRECTION.D2S) return;
            if(type === 'out' && Link.attr("direction") !== DIRECTION.S2D) return;
            relatedNodes.push(Link.target);
        }
        if (Nodes.indexOf(Link.target) !== -1) {
            if(type === 'in' && Link.attr("direction") !== DIRECTION.S2D) return;
            if(type === 'out' && Link.attr("direction") !== DIRECTION.D2S) return;
            relatedNodes.push(Link.source);
        }
    });
    
    return relatedNodes;
}

function getRelatedNodes(filter) {
    var Nodes = this.getNodes(filter);
    var argLength = Nodes.length;
    
    for (var i = 0; i < Nodes.length; i++) {
        var adjList = getAdjNode(Nodes[i], this);
        adjList.forEach(function (Node) {
            if (Nodes.indexOf(Node) === -1) {
                Nodes.push(Node);
            }
        });
    }
    
    //minus original Nodes
    Nodes = Nodes.filter(function(Node, i){
        return i >= argLength;
    });
    return Nodes;
    
    function getAdjNode(Node, self) {
        var Nodes = [];
        self.getRenderedLinks().forEach(function (Link) {
            if (Link.source === Node && (Nodes.indexOf(Link.target) === -1)) {
                Nodes.push(Link.target);
            } else if (Link.target === Node && (Nodes.indexOf(Link.source) === -1)) {
                Nodes.push(Link.source);
            }
        });
        return Nodes;
    }
}

export {getNodes, getRenderedNodes, getSelectedNodes, getDisabledNodes, getInvertedNodes, getUngroupedNodes, getLinkedNodes, getRelatedNodes};