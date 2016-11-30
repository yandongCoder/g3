import filterBy from "../utils/filterBy";

function getNodes(filter) {
    return filterBy(filter, this._nodes);
}

function getRenderedNodes() {
    return this.getNodes(function(Node){
        return !Node.attr("hide");
    });
}

function getSelectedNodes() {
    return this.getNodes(function(Node){
        return Node.attr("selected");
    });
}

export {getNodes, getRenderedNodes, getSelectedNodes};