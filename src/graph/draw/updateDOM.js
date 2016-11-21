import Node from "../node/index";
import Link from "../link/index";
import {RENDER_TYPE} from "../CONSTANT";

export default function UpdateDOM(graph){
    this.graph = graph;
    this._updateNodes = [];
    this._updateLinks = [];
};

UpdateDOM.prototype = {
    constructor: UpdateDOM,
    addObj: addObj,
    _addNode: addNode,
    _addLink: addLink,
    getNodesEle: getNodesEle,
    getLinks: getLinks,
    getLinksLabel: getLinksLabel,
    clearUpdateNodes: clearUpdateNodes,
    clearUpdateLinks: clearUpdateLinks
    
};

function addObj(Obj, renderType){
    if(Obj instanceof Node){
        this._addNode(Obj);
        if(renderType === RENDER_TYPE.NUDGE){
            var selectedNodes = this.graph.getSelectedNodes();
            var relatedLinks = this.graph.getRelatedLinks(selectedNodes);
            relatedLinks.forEach(function(Link){
                this._addLink(Link);
            }, this);
            
        }
    }
    if(Obj instanceof Link) this._addLink(Obj);
}

function addNode(Node){
    if(this._updateNodes.indexOf(Node) === -1) this._updateNodes.push(Node);
}

function addLink(Link){
    if(this._updateLinks.indexOf(Link) === -1) this._updateLinks.push(Link);
}

function getNodesEle(){
    return this._updateNodes.map(function(Node){return Node._element;});
}

function getLinks(){
    return this._updateLinks.map(function(Node){return Node._pathEle;});
}

function getLinksLabel(){
    return this._updateLinks.map(function(Node){return Node._labelEle;});
}

function clearUpdateNodes(){
    this._updateNodes = [];
}

function clearUpdateLinks(){
    this._updateLinks = [];
}