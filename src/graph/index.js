import select from "../utils/select";
import render from "./render";
import nodes from "./nodes";
import getNodes from "./getNodes";
import getSelectedNodes from "./getSelectedNodes";
import getRenderedNodes from "./getRenderedNodes";
import getUngroupedNodes from "./getUngroupedNodes";
import addNode from "./addNode";
import hasNode from "./hasNode";
import removeNodes from "./removeNodes";
import clearNodes from "./clearNodes";
import selectNodes from "./selectNodes";
import deselectNodes from "./deselectNodes";
import deselectLinks from "./deselectLinks";
import getInvertedNodes from "./getInvertedNodes";
import getRelatedNodes from "./getRelatedNodes";
import getLinkedNodes from "./getLinkedNodes";
import buildReference from "./buildReference";
import links from "./links";
import {getLinks, getContainLinks, getAttachedLinks, getRenderedLinks} from "./getLinks";
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
import groupBy from "./groupBy";
import flattenGroup from "./flattenGroup";
import draged from "./draged";
import defaultConfig from "./defaultConfig";
import findShortestPath from "./findShortestPath";
import gridLayout from "./gridLayout";
import forceLayout from "./forceLayout";
import hierarchyLayout from "./hierarchyLayout";
import getJSON from "./getJSON";

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
    getUngroupedNodes: getUngroupedNodes,
    _addNode: addNode,
    removeNodes: removeNodes,
    clearNodes: clearNodes,
    selectNodes: selectNodes,
    deselectNodes: deselectNodes,
    deselectLinks: deselectLinks,
    getInvertedNodes: getInvertedNodes,
    getRelatedNodes: getRelatedNodes,
    getLinkedNodes: getLinkedNodes,
    hasNode: hasNode,
    //_preTransfer: preTransfer,
    buildReference: buildReference,
    links: links,
    getLinks: getLinks,
    getRenderedLinks: getRenderedLinks,
    getContainLinks: getContainLinks,
    getAttachedLinks: getAttachedLinks,
    getJSON: getJSON,
    _addLink: addLink,
    hasLink: hasLink,
    removeLinks: removeLinks,
    _removeLinksOfNode: removeLinksOfNode,
    clearLinks: clearLinks,
    transform: transform,
    scaleTo: scaleTo,
    translateBy: translateBy,
    group: group,
    groupBy: groupBy,
    flattenGroup: flattenGroup,
    draged: draged,
    findShortestPath: findShortestPath,
    gridLayout: gridLayout,
    forceLayout: forceLayout,
    hierarchyLayout: hierarchyLayout,
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