import select from "../utils/select";
import width from "./width";
import height from "./height";
import render from "./render";
import data from "./data";
import nodes from "./nodes";
import addNode from "./addNode";
import hasNode from "./hasNode";
import clearNodes from "./clearNodes";
import links from "./links";
import addLink from "./addLink";
import hasLink from "./hasLink";
import clearLinks from "./clearLinks";
import init from "./init/init";
import draw from "./draw/index";

function Graph(selector) {
    this._svg = select(selector);
    this._r = 30;
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
    clearNodes: clearNodes,
    hasNode: hasNode,
    links: links,
    addLink: addLink,
    hasLink: hasLink,
    clearLinks: clearLinks,
    _init: init,
    _draw: draw
};

export default function (selector) {
    return new Graph(selector);
}