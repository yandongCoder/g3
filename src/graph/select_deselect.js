function selectNodes(filter, retainOther) {
    if(!retainOther) this.deselectNodes();
    this.getNodes(filter).forEach(function(Node){
        Node.selected(true);
    }, this);
}

function deselectNodes() {
    this.getSelectedNodes().forEach(function(Node){
        Node.selected(false);
    }, this);
    return this;
}

function deselectLinks(filter) {
    this.getLinks(filter).forEach(function(Link){
        Link.selected(false);
    }, this);
    return this;
}

export {selectNodes, deselectNodes, deselectLinks};