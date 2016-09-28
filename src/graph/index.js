import select from "../utils/select";
import width from "./width";
import height from "./height";
import render from "./render";
import nodes from "./nodes";
import getNodes from "./getNodes";
import getRenderedNodes from "./getRenderedNodes";
import addNode from "./addNode";
import hasNode from "./hasNode";
import removeNodes from "./removeNodes";
import clearNodes from "./clearNodes";
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

function Graph(selector, config) {
    if(config === undefined) config = {};

    this._canvas = select(selector);

    this._hasInit = false; //init only once

    this._radius= config.radius || 15;
    this._linkWidth = config.linkWidth || 3;
    this._movable = config.movable || false;
    this._zoomable = config.zoomable || false;

    this._autoRender  = config.autoRender || false;

    this._nodes = [];
    this._links = [];
}

Graph.prototype = {
    constructor: Graph,
    width: width,
    height: height,
    render: render,
    nodes: nodes,
    getNodes: getNodes,
    getRenderedNodes: getRenderedNodes,
    _addNode: addNode,
    removeNodes: removeNodes,
    clearNodes: clearNodes,
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