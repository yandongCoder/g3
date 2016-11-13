import {RENDER_TYPE} from "./CONSTANT";

function selectNodes(filter, retainOther) {
    if(!retainOther) this.deselectNodes();
    this.getNodes(filter).forEach(function(Node){
        Node.selected(true);
    }, this);

    this.render(RENDER_TYPE.SELECT);
}

function deselectNodes(filter) {
    this.getNodes(filter).forEach(function(Node){
        Node.selected(false);
    }, this);
    this.render(RENDER_TYPE.SELECT);
    return this;
}

function deselectLinks(filter) {
    this.getLinks(filter).forEach(function(Link){
        Link.selected(false);
    }, this);
    this.render(RENDER_TYPE.SELECT);
    return this;
}

export {selectNodes, deselectNodes, deselectLinks};