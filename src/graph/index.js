import select from "../utils/select";
import render from "./render";
import nodes from "./nodes";
import getNodes from "./getNodes";
import getSelectedNodes from "./getSelectedNodes";
import getRenderedNodes from "./getRenderedNodes";
import addNode from "./addNode";
import hasNode from "./hasNode";
import removeNodes from "./removeNodes";
import clearNodes from "./clearNodes";
import selectNodes from "./selectNodes";
import unselectNodes from "./unselectNodes";
import getInvertedNodes from "./getInvertedNodes";
import getRelatedNodes from "./getRelatedNodes";
import getLinkedNodes from "./getLinkedNodes";
import preTransfer from "./preTransfer";
import links from "./links";
import getLinks from "./getLinks";
import getRenderedLinks from "./getRenderedLinks";
import addLink from "./addLink";
import hasLink from "./hasLink";
import removeLinks from "./removeLinks";
import removeLinksOfNode from "./removeLinksOfNode";
import clearLinks from "./clearLinks";
import init from "./init/init";
import draw from "./draw/index";
import zoomed from "./zoomed";
import transform from "./transform";
import scaleTo from "./scaleTo";
import translateBy from "./translateBy";
import keydowned from "./keydowned";
import keyupped from "./keyupped";
import group from "./group";
import getContainLinks from "./getContainLinks";
import getAttachedLinks from "./getAttachedLinks";
import draged from "./draged";
import defaultConfig from "./defaultConfig";
import findShortestPath from "./findShortestPath";
import gridLayout from "./gridLayout";

function Graph(selector, config) {

    this.config = Object.assign({}, defaultConfig, config || {});

    this._canvas = select(selector);

    this._hasInit = false; //init only once
    
    this._nodes = [];
    this._nodesHash = {};
    this._links = [];
    this._linksHash = {};
}

Graph.prototype = {
    constructor: Graph,
    render: render,
    nodes: nodes,
    getNodes: getNodes,
    getSelectedNodes: getSelectedNodes,
    getRenderedNodes: getRenderedNodes,
    _addNode: addNode,
    removeNodes: removeNodes,
    clearNodes: clearNodes,
    selectNodes: selectNodes,
    unselectNodes: unselectNodes,
    getInvertedNodes: getInvertedNodes,
    getRelatedNodes: getRelatedNodes,
    getLinkedNodes: getLinkedNodes,
    hasNode: hasNode,
    _preTransfer: preTransfer,
    links: links,
    getLinks: getLinks,
    getRenderedLinks: getRenderedLinks,
    getContainLinks: getContainLinks,
    getAttachedLinks: getAttachedLinks,
    _addLink: addLink,
    hasLink: hasLink,
    removeLinks: removeLinks,
    _removeLinksOfNode: removeLinksOfNode,
    clearLinks: clearLinks,
    transform: transform,
    scaleTo: scaleTo,
    translateBy: translateBy,
    group: group,
    draged: draged,
    findShortestPath: findShortestPath,
    gridLayout: gridLayout,
    _keydowned: keydowned,
    _keyupped: keyupped,
    _init: init,
    _draw: draw,
    _zoomed: zoomed,
    _getCurrentTransform: function(){
        return d3.zoomTransform(this._canvas);
    },
    _getCurrentScale: function(){
        return this._getCurrentTransform().k;
    },
    _getCurrentTranslate: function(){
        var transform = this._getCurrentTransform();
        return [transform.x, transform.y];
    },
    _getBrushSelection: function () {
        return this._getSvgSelection().select('g.brush');
    },
    _getSvgSelection: function(duration){
        var svgSelection = d3.select(this._canvas);

        if(duration) svgSelection = svgSelection.transition(Math.random()).duration(duration);

        return svgSelection
    },
    _getSelectedNodesSelection: function(){
        return this._getSvgSelection().select('.nodes').selectAll("g.node.selected");
    },
    _getNodesSelection: function(){
        return this._getSvgSelection().select('.nodes').selectAll("g.node");
    },
    _getNodesLabelSelection: function(){
        return this._getNodesSelection().selectAll('.text-group');
    },
    _getLinksSelection: function(){
        return this._getSvgSelection().select('g.paths').selectAll("path");
    },
    _getLinksLabelSelection: function(){
        return this._getSvgSelection().select('g.link-labels').selectAll('text.link-label');
    },
    _getForceGroup: function(){
        return this._forceGroupSelection;
    }
};

export default function (selector, config) {
    return new Graph(selector, config);
}