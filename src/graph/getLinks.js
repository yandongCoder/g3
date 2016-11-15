import filterBy from "../utils/filterBy";
import getIds from "../utils/getIds";

function getLinks(filter) {
    return filterBy(filter, this._links);
}

function getContainLinks(Nodes) {
    var ids = getIds(Nodes);
    return this._links.filter(function(Link){
        return (ids.indexOf(Link.getSourceId()) !== -1) && (ids.indexOf(Link.getTargetId()) !== -1) && !Link.merged();
    });
}

function getAttachedLinks(Nodes) {
    var ids = getIds(Nodes);
    return this._links.filter(function (Link) {
        return ( (ids.indexOf(Link.getSourceId()) === -1 && ids.indexOf(Link.getTargetId()) !== -1) || (ids.indexOf(Link.getSourceId()) !== -1 && ids.indexOf(Link.getTargetId()) === -1) )
            && !Link.merged();
    });
}

function getRelatedLinks(Nodes) {
    return this.getContainLinks(Nodes).concat(this.getAttachedLinks(Nodes));
}

function getRenderedLinks() {
    return this.getLinks(function(Link){
        return !Link.transformed() && !Link.merged() && !Link.grouped();
    });
}

export {getLinks, getContainLinks, getAttachedLinks, getRelatedLinks, getRenderedLinks};