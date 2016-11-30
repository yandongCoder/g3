import filterBy from "../utils/filterBy";
import getIds from "../utils/getIds";
import Selection from "./Selection/index";

function getLinksOP(filter, val){
    return new Selection(this.getLinks(filter, val));
}

function getLinks(filter, val) {
    if(arguments.length === 2 && val !== undefined){
        var key = filter;
        filter = function(Node){return Node.attr(key) === val;}
    }
    
    return filterBy(filter, this._links);
}

function getSelectedLinks() {
    return this.getLinks(function(Link){
        return Link.attr("selected");
    });
}

function getDisabledLinks() {
    return this.getLinks(function(Link){
        return Link.attr("disabled");
    });
}

function getContainLinks(Nodes) {
    var ids = getIds(Nodes);
    var containedLinks = [];
    
    for(var i = this._links.length; i--;){
        var Link = this._links[i];
        if((ids.indexOf(Link.getSourceId()) !== -1) && (ids.indexOf(Link.getTargetId()) !== -1)){
            containedLinks.push(Link);
        }
    }
    return containedLinks;
}

function getAttachedLinks(Nodes) {
    var ids = getIds(Nodes);
    var links = this.getRenderedLinks();
    var attachedLinks = [];
    for(var i = links.length; i--;){
        var Link = links[i];
        if( (ids.indexOf(Link.getSourceId()) === -1 && ids.indexOf(Link.getTargetId()) !== -1) || (ids.indexOf(Link.getSourceId()) !== -1 && ids.indexOf(Link.getTargetId()) === -1) ){
            attachedLinks.push(Link);
        }
    }
    return attachedLinks;
}

function getRelatedLinks(Nodes) {
    return this.getContainLinks(Nodes).concat(this.getAttachedLinks(Nodes));
}

function getRenderedLinks() {
    return this.getLinks(function(Link){
        return !Link.attr("hide");
    });
}

export {getLinksOP, getLinks, getSelectedLinks, getDisabledLinks, getContainLinks, getAttachedLinks, getRelatedLinks, getRenderedLinks};