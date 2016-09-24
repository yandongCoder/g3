import deriveLinkFromLNL from "../../utils/deriveLinkFromLNL";

export default function () {
    var contractedLinks = this.getConnectedLinks(true);

    if(contractedLinks.length !== 2) return;

    this.transformed(true);
    contractedLinks.forEach(function(group){
        group.forEach(function(Link){Link.transformed(true);});
    });
    
    this.graph._addLink(deriveLinkFromLNL(contractedLinks[0], this, contractedLinks[1]));

    this.graph.render();
}