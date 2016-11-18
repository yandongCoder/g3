import deriveLinkFromLinks from "../../utils/deriveLinkFromLinks";
import MergedBy from "../helper/mergedBy";
import {LINK_REMOVE_TYPE} from "../CONSTANT";

function merge() {
    //每个Link本身只能被合并一次，也意味着只能存在于唯一一个Link的mergedBy属性中，for idempotent, 幂等性
    var toMergedLinks = this.getHomoLinks().filter(function(Link){ return !Link.merged() && !Link.grouped()});

    if(toMergedLinks.length <= 1) return;
    
    var linkObj = deriveLinkFromLinks(toMergedLinks, this.graph);

    var Link = this.graph._addLink(linkObj);
    
    Link.mergedBy = new MergedBy(toMergedLinks, Link);
    
    Link.NtoL();

    this.graph.render();

    return this;
}

function flattenMerge() {
    this.getHomoLinks().forEach(function(Link){
        Link.unmerge();
    });
    
    this.merge();
}

function unmerge() {
    if(!this.mergedBy) return;
    
    this.remove(LINK_REMOVE_TYPE.UNMERGE);
    
    this.mergedBy.unmerge();
    
    return this;
}

export {merge, flattenMerge, unmerge};