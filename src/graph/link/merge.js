import deriveLinkFromLinks from "../../utils/deriveLinkFromLinks";

export default function () {

    var homoLinks = this.getHomoLinks()
        .filter(function(Link){ return !Link.merged()});//for idempotent, 幂等性

    if(homoLinks.length <= 1) return;

    homoLinks.forEach(function(Link){
        Link.merged(true);
    });

    var newLink = deriveLinkFromLinks(homoLinks);
    newLink.mergedBy = homoLinks;

    this.graph.addLink(newLink);

    this.graph.render();

    return this;
}