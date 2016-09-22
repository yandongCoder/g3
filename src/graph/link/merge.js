import deriveLinkFromLinks from "../../utils/deriveLinkFromLinks";

export default function () {
    //每个Link本身只能被合并一次，也意味着只能存在于唯一一个Link的mergedBy属性中，for idempotent, 幂等性
    if(this._hasBeenMerged()) return;

    var homoLinks = this.getHomoLinks();

    if(homoLinks.length <= 1) return;

    homoLinks.forEach(function(Link){
        Link.merged(true);
    });

    var newLink = deriveLinkFromLinks(homoLinks);
    newLink.mergedBy = homoLinks;

    this.graph._addLink(newLink);

    this.graph.render();

    return this;
}