import {_render, delayRender, render} from "./render";
import {clearNodes, clearLinks, hasNode, hasLink, addNode, addLink, removeNodes, removeLinks, removeLinksOfNode, nodes, links} from "./data";
import {getNodesOP, getNodes, getRenderedNodes, getSelectedNodes} from "./getNodes";
import {getLinksOP, getLinks, getSelectedLinks, getContainLinks, getAttachedLinks, getRelatedLinks, getRenderedLinks} from "./getLinks";
import init from "./init/init";
import draw from "./draw/index";
import zoomed from "./zoomed";
import {transform, focus} from "./transform";
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
    _render: _render,
    delayRender: delayRender,
    render: render,
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
    focus: focus,
    draged: draged,
    _keydowned: keydowned,
    _keyupped: keyupped,
    _init: init,
    _draw: draw,
    _zoomed: zoomed,
    currentTransform: function(){
        if(!this.element) return;
        return d3.zoomTransform(this.element);
    },
    brushSelection: function () {
        return this.svgSelection().select('g.brush');
    },
    svgSelection: function(duration){
        var svgSelection = d3.select(this.element);

        if(duration) svgSelection = svgSelection.transition(Math.random()).duration(duration);

        return svgSelection;
    },
    nodesSelection: function(){
        return this.svgSelection().select('.nodes').selectAll("g.node");
    },
    linksSelection: function(){
        return this.svgSelection().select('g.links').selectAll(".link");
    }
};

export default function (selector, config) {
    return new Graph(selector, config);
}
