function selectNodes(filter, retainOther) {
    if(!retainOther) this.deselectAll();
    this.getNodes(filter).forEach(function(Node){
        Node.selected(true);
    }, this);
    return this;
}

function selectLinks(filter, retainOther) {
    if(!retainOther) this.deselectAll();
    this.getLinks(filter).forEach(function(Link){
        Link.selected(true);
    }, this);
    return this;
}

function deselectAll(){
    this.deselectNodes();
    this.deselectLinks();
}

function deselectNodes() {
    this.getSelectedNodes().forEach(function(Node){
        Node.selected(false);
    }, this);
    return this;
}

function deselectLinks(filter) {
    this.getSelectedLinks(filter).forEach(function(Link){
        Link.selected(false);
    }, this);
    return this;
}

export {selectNodes, selectLinks, deselectAll, deselectNodes, deselectLinks};