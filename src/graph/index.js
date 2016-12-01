import {render, delayRender, renderImmediately} from "./render";
import {clearNodes, clearLinks, hasNode, hasLink, addNode, addLink, removeNodes, removeLinks, removeLinksOfNode, nodes, links} from "./data";
import {getNodesOP, getNodes, getRenderedNodes, getSelectedNodes} from "./getNodes";
import {getLinksOP, getLinks, getSelectedLinks, getContainLinks, getAttachedLinks, getRelatedLinks, getRenderedLinks} from "./getLinks";
import init from "./init/init";
import draw from "./draw/index";
import zoomed from "./zoomed";
import {transform, scaleTo, translateBy, focus} from "./transform";
import {keyupped, keydowned} from "./keyboard";
import draged from "./draged";
import {selector, config} from "./config";
import updateDOM from "./draw/updateDOM";

function Graph(selector, config) {
    
    this.selector(selector);
    this.config(config);
    
    this._hasInit = false; //init only once
    
    this._nodes = [];
    this._nodesHash = {};
    this._links = [];
    this._linksHash = {};
    
    this.updateDOM = new updateDOM(this);
}

Graph.prototype = {
    constructor: Graph,
    selector: selector,
    config: config,
    render: render,
    delayRender: delayRender,
    renderImmediately: renderImmediately,
    nodes: nodes,
    getNodesOP: getNodesOP,
    getNodes: getNodes,
    getSelectedNodes: getSelectedNodes,
    getRenderedNodes: getRenderedNodes,
    _addNode: addNode,
    removeNodes: removeNodes,
    clearNodes: clearNodes,
    hasNode: hasNode,
    links: links,
    getLinks: getLinks,
    getLinksOP: getLinksOP,
    getSelectedLinks: getSelectedLinks,
    getRenderedLinks: getRenderedLinks,
    getContainLinks: getContainLinks,
    getAttachedLinks: getAttachedLinks,
    getRelatedLinks: getRelatedLinks,
    _addLink: addLink,
    hasLink: hasLink,
    removeLinks: removeLinks,
    _removeLinksOfNode: removeLinksOfNode,
    clearLinks: clearLinks,
    transform: transform,
    scaleTo: scaleTo,
    translateBy: translateBy,
    focus: focus,
    draged: draged,
    _keydowned: keydowned,
    _keyupped: keyupped,
    _init: init,
    _draw: draw,
    _zoomed: zoomed,
    getCurrentTransform: function(){
        if(!this._canvas) return;
        return d3.zoomTransform(this._canvas);
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
        return this._getSvgSelection().select('g.links').selectAll(".link");
    },
    _getForceGroup: function(){
        return this._forceGroupSelection;
    }
};

export default function (selector, config) {
    return new Graph(selector, config);
}