function selectNodes(filter, retainOther) {
    if(!retainOther) this.deselectAll();
    this.getNodes(filter).forEach(function(Node){
        Node.attr("selected",true);
    }, this);
    return this;
}

function selectLinks(filter, retainOther) {
    if(!retainOther) this.deselectAll();
    this.getLinks(filter).forEach(function(Link){
        Link.attr("selected",true);
    }, this);
    return this;
}

function deselectAll(){
    this.deselectNodes();
    this.deselectLinks();
}

function deselectNodes() {
    this.getSelectedNodes().forEach(function(Node){
        Node.attr("selected",false);
    }, this);
    return this;
}

function deselectLinks(filter) {
    this.getSelectedLinks(filter).forEach(function(Link){
        Link.attr("selected", false);
    }, this);
    return this;
}

function disableNodes(filter, notRetainOther) {
    if(notRetainOther) this.enableAll();
    this.getNodes(filter).forEach(function(Node){
        Node.attr("disabled",true);
    }, this);
    return this;
}

function disableLinks(filter, notRetainOther) {
    if(notRetainOther) this.enableAll();
    this.getLinks(filter).forEach(function(Link){
        Link.attr("disabled", true);
    }, this);
    return this;
}

function enableAll(){
    this.enableNodes();
    this.enableLinks();
}

function enableNodes() {
    this.getDisabledNodes().forEach(function(Node){
        Node.attr("disabled",false);
    }, this);
    return this;
}

function enableLinks(filter) {
    this.getDisabledLinks(filter).forEach(function(Link){
        Link.attr("disabled", false);
    }, this);
    return this;
}


export {selectNodes, selectLinks, deselectAll, deselectNodes, deselectLinks,
        disableNodes, disableLinks, enableAll, enableNodes, enableLinks};