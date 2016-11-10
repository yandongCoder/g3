import deriveLinkFromLinks from "../../utils/deriveLinkFromLinks";
import MergedBy from "../helper/mergedBy";

export default function () {
    //每个Link本身只能被合并一次，也意味着只能存在于唯一一个Link的mergedBy属性中，for idempotent, 幂等性
    var toMergedLinks = this.getHomoLinks().filter(function(Link){ return !Link.merged() && !Link.grouped()});

    if(toMergedLinks.length <= 1) return;
    
    var linkObj = deriveLinkFromLinks(toMergedLinks);
    linkObj.mergedBy = new MergedBy(toMergedLinks);

    var Link = this.graph._addLink(linkObj);

    Link.NtoL();

    this.graph.render();

    return this;
}