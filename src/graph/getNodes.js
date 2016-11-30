import filterBy from "../utils/filterBy";
import Selection from "./Selection/index";

function getNodesOP(filter, val){
    return new Selection(this.getNodes(filter, val), this);
}

function getNodes(filter, val) {
    if(arguments.length === 2 && val !== undefined){
        var key = filter;
        filter = function(Node){return Node.attr(key) === val;}
    }
    return filterBy(filter, this._nodes);
}

function getRenderedNodes() {
    return this.getNodes(function(Node){
        return !Node.attr("hide");
    });
}

function getSelectedNodes() {
    return this.getNodes("selected", true);
}

export {getNodesOP, getNodes, getRenderedNodes, getSelectedNodes};