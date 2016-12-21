import toArray from "../utils/toArray";
import Node from "./node/index";
import Link from "./link/index";
// import drawCanvasLink from './draw/drawCanvasLink2';
import drawCanvasNode from './draw/drawCanvasNode_';

function clearNodes() {
    this._nodes = [];
}

function clearLinks() {
    this._links = [];
}

function hasNode(obj) {
    return Boolean(this._nodesHash[obj.id]);
}

function hasLink(obj) {
    return Boolean(this._linksHash[obj.id]);
}

function addNode(obj) {
    var node = new Node(obj, this);
    if(!this.hasNode(node)){
        this._nodesHash[node.id] = node;
        this._nodes.push(node);
    }
    return node;
}

function addLink(obj) {
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
    if(this.element.nodeName === 'CANVAS'){
        //初始化
        drawCanvasNode.call(this);
       /* var nodes = this.getRenderedNodes();
        var nodesCache = [];
        for(var i=0;i<nodes.length;i++){
            var tempCanvas = document.createElement('canvas');
            nodesCache.push(tempCanvas);
        }
        this.nodesCache = nodesCache;
        var canvasObj = {
            nodes:this.getRenderedNodes(),
            nodesCache:this.nodesCache
        };
        drawCanvasNode(canvasObj);*/
    }
    return this;
}

function links(links, cover) {
    links = toArray(links);
    
    if(!arguments.length) return this._links;
    if(cover) this.clearLinks();
    
    links.forEach(function(v){ this._addLink(v); },this);
    this._render();
    if(this.element.nodeName === 'CANVAS'){
        var canvas = document.createElement('canvas');
        canvas.width = this.element.width;
        canvas.height = this.element.height;
        this.linkCanvas = canvas;
       /* var links = this.getRenderedLinks();
        var nodes = this.getRenderedNodes();
        var linksCache = [];
        for(var j=0;j<links.length;j++){
            var tempCanvas = document.createElement('canvas');
            // var svg = document.createElement('svg');


            linksCache.push(tempCanvas);
        }*/
        // this.linksCache = [];
        /*var canvasObj = {
            links:this.getRenderedLinks(),
            linksCache:this.linksCache,
            cacheList:this.cacheList
        };*/
        // drawCanvasLink.call(this);
    }

    return this;
}

function calcCache(nodes,links) {
    // var links = this.getRenderedLinks();
    // var nodes = this.getRenderedNodes();
    //计算哪些边画在一个
    var cacheList = [];
    var nodeLinkMap = {};
    var linkIdMap = {};
    //遍历links
    for(var i=0;i<links.length;i++){
        linkIdMap[links[i].id] = i;
        if(!nodeLinkMap[links[i].source.id]){
            nodeLinkMap[links[i].source.id] = {
                num:1,
                links:[i]
            };
        }else{
            nodeLinkMap[links[i].source.id].num++;
            nodeLinkMap[links[i].source.id].links.push(i);

        }

        if(!nodeLinkMap[links[i].target.id]){
            nodeLinkMap[links[i].target.id] = {
                num:1,
                links:[i]
            };
        }else{
            nodeLinkMap[links[i].target.id].num++;
            nodeLinkMap[links[i].target.id].links.push(i);
        }
    }


    for(var n=0;n<nodes.length;n++){
        if(nodeLinkMap[nodes[n].id]){

            //求得最小的x 最大的x 最小的y 最大的y
            var link = nodeLinkMap[nodes[n].id].links;
            var minx,maxx,miny,maxy;
            for(var m=0;m<link.length;m++){
                if(m==0){
                    minx = Math.min(links[link[m]].source.x,links[link[m]].target.x);
                    maxx = Math.max(links[link[m]].source.x,links[link[m]].target.x);
                    miny = Math.min(links[link[m]].source.y,links[link[m]].target.y);
                    maxy = Math.max(links[link[m]].source.y,links[link[m]].target.y);
                }else{
                    var tMinx = Math.min(links[link[m]].source.x,links[link[m]].target.x);
                    var tMaxx = Math.max(links[link[m]].source.x,links[link[m]].target.x);
                    var tMiny = Math.min(links[link[m]].source.y,links[link[m]].target.y);
                    var tMaxy = Math.max(links[link[m]].source.y,links[link[m]].target.y);
                    minx = minx>tMinx ? tMinx : minx;
                    maxx = maxx<tMaxx ? tMaxx : maxx;
                    miny = miny>tMiny ? tMiny : miny;
                    maxy = maxy<tMaxy ? tMaxy : maxy;
                }
            }
            nodeLinkMap[nodes[n].id].minx = minx;
            nodeLinkMap[nodes[n].id].maxx = maxx;
            nodeLinkMap[nodes[n].id].miny = miny;
            nodeLinkMap[nodes[n].id].maxy = maxy;

            cacheList.push( nodeLinkMap[nodes[n].id]);
            link = null;
        }

    }
    nodeLinkMap = null;
    return cacheList;
}

export {clearNodes, clearLinks, hasNode, hasLink, addNode, addLink, removeNodes, removeLinks, removeLinksOfNode, nodes, links};