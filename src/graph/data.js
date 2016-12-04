import toArray from "../utils/toArray";
import UUID from "../utils/UUID";
import Node from "./node/index";
import Link from "./link/index";

function clearNodes() {
    this._nodes = [];
}

function clearLinks() {
    this._links = [];
}

function hasNode(obj) {
    return this._nodesHash[obj.id]? true: false;
}

function hasLink(obj) {
    return this._linksHash[obj.id]? true: false;
}

function addNode(obj) {
    if(!obj.id && this._config.autoId) obj.id = UUID();
    
    var node = new Node(obj, this);
    if(!this.hasNode(node)){
        this._nodesHash[node.id] = node;
        this._nodes.push(node);
    }
    return node;
}

function addLink(obj) {
    if(!obj.id && this._config.autoId) obj.id = UUID();
    
    var link = new Link(obj, this);
    if(!this.hasLink(link) && link.hasST()){
        this._linksHash[link.id] = link;
        this._links.push(link);
    }
    
    return link;
}

function removeNodes(filter) {
    this.getNodes(filter).forEach(function(Node){
        //remove links first
        this._removeLinksOfNode(Node);
        Node.remove();
    }, this);
    
    this._render();
}

function removeLinks(filter) {
    this.getLinks(filter).forEach(function(Link){
        Link.remove();
    }, this);
    
    this._render();
}

function removeLinksOfNode(Node) {
    Node.getConnectedLinks().map(function (Link) {
        Link.remove();
    }, this);
}

function nodes(nodes, cover) {
    nodes = toArray(nodes);
    
    if(!arguments.length) return this._nodes;
    if(cover) this.clearNodes();
    
    nodes.forEach(function(v){ this._addNode(v);},this);
    
    this._render();
    return this;
}

function links(links, cover) {
    links = toArray(links);
    
    if(!arguments.length) return this._links;
    if(cover) this.clearLinks();
    
    links.forEach(function(v){ this._addLink(v); },this);
    
    this._render();
    return this;
}

export {clearNodes, clearLinks, hasNode, hasLink, addNode, addLink, removeNodes, removeLinks, removeLinksOfNode, nodes, links};