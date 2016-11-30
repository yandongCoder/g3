function selectNodes(filter, retainOther) {
    if(!retainOther) this.deselectAll();
    this.getNodesOP(filter).attr("selected", true);
    return this;
}

function selectLinks(filter, retainOther) {
    if(!retainOther) this.deselectAll();
    this.getLinksOP(filter).attr("selected",true);
    return this;
}

function deselectAll(){
    this.deselectNodes();
    this.deselectLinks();
}

function deselectNodes() {
    this.getNodesOP('selected', true).attr("selected",false);
    return this;
}

function deselectLinks(filter) {
    this.getLinksOP(filter).attr("selected", false);
    return this;
}

function disableNodes(filter, notRetainOther) {
    if(notRetainOther) this.enableAll();
    this.getNodesOP(filter).attr("disabled",true);
    return this;
}

function disableLinks(filter, notRetainOther) {
    if(notRetainOther) this.enableAll();
    this.getLinksOP(filter).attr("disabled", true);
    return this;
}

function enableAll(){
    this.enableNodes();
    this.enableLinks();
}

function enableNodes() {
    this.getNodesOP("disabled", true).attr("disabled",false);
    return this;
}

function enableLinks(filter) {
    this.getDisabledLinks(filter).attr("disabled", false);
    return this;
}

export {selectNodes, selectLinks, deselectAll, deselectNodes, deselectLinks,
        disableNodes, disableLinks, enableAll, enableNodes, enableLinks};
