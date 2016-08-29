import select from "../utils/select";
import width from "./width";
import height from "./height";
import render from "./render";
import data from "./data";
import nodes from "./nodes";
import links from "./links";
import init from "./init/init";
import draw from "./draw/index";

function Graph(selector) {
    this._svg = select(selector);
    this._r = 30;
}

Graph.prototype = {
    constructor: Graph,
    width: width,
    height: height,
    render: render,
    data: data,
    nodes: nodes,
    links: links,
    _init: init,
    _draw: draw
};

export default function (selector) {
    return new Graph(selector);
}