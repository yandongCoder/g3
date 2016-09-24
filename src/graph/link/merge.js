import deriveLinkFromLinks from "../../utils/deriveLinkFromLinks";

export default function () {
    //每个Link本身只能被合并一次，也意味着只能存在于唯一一个Link的mergedBy属性中，for idempotent, 幂等性
    var toMergedLinks = this.getHomoLinks().filter(function(Link){ return !Link.merged()});

    if(toMergedLinks.length <= 1) return;

    toMergedLinks.forEach(function(Link){
        Link.merged(true);
    });
    
    var newLink = deriveLinkFromLinks(toMergedLinks);
    newLink.mergedBy = toMergedLinks;

    this.graph._addLink(newLink);

    this.graph.render();

    return this;
}