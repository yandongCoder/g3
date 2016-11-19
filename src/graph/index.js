import {render, delayRender, renderImmediately} from "./render";
import {clearNodes, clearLinks, hasNode, hasLink, addNode, addLink, removeNodes, removeLinks, removeLinksOfNode, nodes, links} from "./data";
import {getNodes, getRenderedNodes, getSelectedNodes, getDisabledNodes, getInvertedNodes, getUngroupedNodes, getLinkedNodes, getRelatedNodes} from "./getNodes";
import {getLinks, getSelectedLinks, getDisabledLinks, getContainLinks, getAttachedLinks, getRelatedLinks, getRenderedLinks} from "./getLinks";
import {selectNodes, selectLinks, deselectNodes, deselectLinks, deselectAll, disableNodes, disableLinks, enableAll, enableNodes, enableLinks} from "./multi";
import buildReference from "./buildReference";
import init from "./init/init";
import draw from "./draw/index";
import zoomed from "./zoomed";
import {transform, scaleTo, translateBy} from "./transform";
import {keyupped, keydowned} from "./keyboard";
import {group, groupBy, flattenGroup} from "./group";
import draged from "./draged";
import {selector, config} from "./config";
import findShortestPath from "./findShortestPath";
import {forceLayout, gridLayout, hierarchyLayout} from "./layout";
import getJSON from "./getJSON";
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
    getNodes: getNodes,
    getSelectedNodes: getSelectedNodes,
    getDisabledNodes: getDisabledNodes,
    getRenderedNodes: getRenderedNodes,
    getUngroupedNodes: getUngroupedNodes,
    _addNode: addNode,
    removeNodes: removeNodes,
    clearNodes: clearNodes,
    selectNodes: selectNodes,
    selectLinks: selectLinks,
    deselectNodes: deselectNodes,
    deselectLinks: deselectLinks,
    deselectAll: deselectAll,
    disableNodes: disableNodes,
    disableLinks: disableLinks,
    enableAll: enableAll,
    enableNodes: enableNodes,
    enableLinks: enableLinks,
    getInvertedNodes: getInvertedNodes,
    getRelatedNodes: getRelatedNodes,
    getLinkedNodes: getLinkedNodes,
    hasNode: hasNode,
    buildReference: buildReference,
    links: links,
    getLinks: getLinks,
    getSelectedLinks: getSelectedLinks,
    getDisabledLinks: getDisabledLinks,
    getRenderedLinks: getRenderedLinks,
    getContainLinks: getContainLinks,
    getAttachedLinks: getAttachedLinks,
    getRelatedLinks: getRelatedLinks,
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
        if(!this._canvas) return;
        return d3.zoomTransform(this._canvas);
    },
    _getCurrentScale: function(){
        var transform = this._getCurrentTransform();
        if(!transform) return;
        return transform.k;
    },
    _getCurrentTranslate: function(){
        var transform = this._getCurrentTransform();
        if(!transform) return;
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