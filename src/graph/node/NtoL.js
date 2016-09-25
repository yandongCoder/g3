import deriveLinkFromLNL from "../../utils/deriveLinkFromLNL";

export default function () {
    var contractedLinks = this.getConnectedLinks(true);

    if(contractedLinks.length !== 2) return;

    this.transformed(true);
    contractedLinks.forEach(function(group){
        group.forEach(function(Link){Link.transformed(true);});
    });

    var newLink = deriveLinkFromLNL(contractedLinks[0], this, contractedLinks[1]);

    newLink.transformedBy = {
        node: this,
        links: contractedLinks[0].concat(contractedLinks[1])
    };


   this.graph._addLink(newLink);

    this.graph.render();
}