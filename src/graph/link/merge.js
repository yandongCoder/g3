import deriveLinkFromLinks from "../../utils/deriveLinkFromLinks";

export default function () {

    var homoLinks = this.getHomoLinks();

    homoLinks.forEach(function(Link){
        Link._merged = true;
    });
    
   this.graph.addLink(deriveLinkFromLinks(homoLinks));

    this.graph.render();
    
    return this;
}