import select from "../utils/select";
import appendPreDefs from "./appendPreDefs";
import width from "./width";
import height from "./height";
import render from "./render";

function Graph(selector) {
    this.parent = select(selector);

    appendPreDefs(this.parent);
}

Graph.prototype = {
    constructor: Graph,
    width: width,
    height: height,
    render: render
};

export default function (selector) {
    return new Graph(selector);
}