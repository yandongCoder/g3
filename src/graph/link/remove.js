import {LINK_REMOVE_TYPE} from "./CONSTANT";

export default function (type) {
    delete this.graph._linksHash[this.id];
    this.graph._links.splice(this.graph._links.indexOf(this), 1);

    this.graph.render();
    
    console.log(this.mergedBy && (type !== LINK_REMOVE_TYPE.UNMERGE));
    if(this.mergedBy && (type !== LINK_REMOVE_TYPE.UNMERGE) ) this.mergedBy.forEach(function(Link){Link.remove(); });

    return this;
}