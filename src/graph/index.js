import select from "../utils/select";
import width from "./width";
import height from "./height";
import render from "./render";
import data from "./data";
import nodes from "./nodes";
import addNode from "./addNode";
import hasNode from "./hasNode";
import removeNodes from "./removeNodes";
import clearNodes from "./clearNodes";
import links from "./links";
import addLink from "./addLink";
import hasLink from "./hasLink";
import removeLinks from "./removeLinks";
import removeLinksByNodes from "./removeLinksByNodes";
import clearLinks from "./clearLinks";
import init from "./init/init";
import draw from "./draw/index";
import transform from "./transform";


function Graph(selector, config) {
    if(config === undefined) config = {};

    this._svg = select(selector);

    this._hasInit = false; //init only once

    this._r = config.r || 30;
    this._movable = config.movable || false;
    this._zoomable = config.zoomable || false;
    
    this._nodes = [];
    this._links = [];
}

Graph.prototype = {
    constructor: Graph,
    width: width,
    height: height,
    render: render,
    data: data,
    nodes: nodes,
    addNode: addNode,
    removeNodes: removeNodes,
    clearNodes: clearNodes,
    hasNode: hasNode,
    links: links,
    addLink: addLink,
    hasLink: hasLink,
    removeLinks: removeLinks,
    _removeLinksByNodes: removeLinksByNodes,
    clearLinks: clearLinks,
    _init: init,
    _draw: draw,
    _transform: transform,
    _getCurrentScale: function(){
        return d3.zoomTransform(this._svg).k;
    },
    _getCurrentTranslate: function(){
        var transform = d3.zoomTransform(this._svg);
        return [transform.x, transform.y];
    },
    _getNodesSelection: function(){
        return this._svgSelection.select('.nodes').selectAll("g.node");
    },
    _getNodesLabelSelection: function(){
        return this._getNodesSelection().selectAll('.text-group');
    },
    _getLinksSelection: function(){
        return this._svgSelection.select('.paths').selectAll("path");
    },
    _getLinksLabelSelection: function(){
        return this._svgSelection.select('g.link-labels').selectAll('text');
    },
    _getForceGroup: function(){
        return this._forceGroupSelection;
    },
    _transformLinksLabel: function(Link){
        return Link.getLinkLabelTransform(Link.getPath(this._r), this._getCurrentScale());
    }
};

export default function (selector) {
    return new Graph(selector);
}