import filterBy from "../utils/filterBy";
import getIds from "../utils/getIds";

function getLinks(filter) {
    return filterBy(filter, this._links);
}

function getContainLinks(Nodes) {
    var ids = getIds(Nodes);
    return this._links.filter(function(Link){
        return (ids.indexOf(Link.source.id) !== -1) && (ids.indexOf(Link.target.id) !== -1) && !Link.merged();
    });
}

function getAttachedLinks(Nodes) {
    var ids = getIds(Nodes);
    return this._links.filter(function (Link) {
        return ( (ids.indexOf(Link.source.id) === -1 && ids.indexOf(Link.target.id) !== -1) || (ids.indexOf(Link.source.id) !== -1 && ids.indexOf(Link.target.id) === -1) )
            && !Link.merged();
    });
}

function getRenderedLinks() {
    return this.getLinks(function(Link){
        return !Link.transformed() && !Link.merged() && !Link.grouped();
    });
}

export {getLinks, getContainLinks, getAttachedLinks, getRenderedLinks};