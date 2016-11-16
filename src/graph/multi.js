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

function disableNodes(filter, retainOther) {
    if(!retainOther) this.enableAll();
    this.getNodes(filter).forEach(function(Node){
        Node.disabled(true);
    }, this);
    return this;
}

function disableLinks(filter, retainOther) {
    if(!retainOther) this.enableAll();
    this.getLinks(filter).forEach(function(Link){
        Link.disabled(true);
    }, this);
    return this;
}

function enableAll(){
    this.enableNodes();
    this.enableLinks();
}

function enableNodes() {
    this.getDisabledNodes().forEach(function(Node){
        Node.disabled(false);
    }, this);
    return this;
}

function enableLinks(filter) {
    this.getDisabledLinks(filter).forEach(function(Link){
        Link.disabled(false);
    }, this);
    return this;
}


export {selectNodes, selectLinks, deselectAll, deselectNodes, deselectLinks,
        disableNodes, disableLinks, enableAll, enableNodes, enableLinks};