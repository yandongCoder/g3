import deriveLinkFromLinks from "../../utils/deriveLinkFromLinks";

export default function () {

    var homoLinks = this.getHomoLinks();

    homoLinks.forEach(function(Link){
        Link._merged = true;
    });

    var newLink = deriveLinkFromLinks(homoLinks);
    newLink.mergedBy = homoLinks;

    this.graph.addLink(newLink);

    this.graph.render();

    return this;
}