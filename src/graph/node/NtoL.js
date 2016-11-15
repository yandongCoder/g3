import deriveLinkFromLNL from "../../utils/deriveLinkFromLNL";
import TransformedBy from "../helper/transformedBy";

export default function () {
    if(this.transformedTo) this.transformedTo.LtoN();//transform a Node that has been transformed before, transform back first.

    var contractedLinks = this.getConnectedLinks(true);

    if(contractedLinks.length !== 2) return;
    
    var newLink = deriveLinkFromLNL(contractedLinks[0], this, contractedLinks[1], this.graph);

    newLink.transformedBy = new TransformedBy(this, contractedLinks[0].concat(contractedLinks[1]));

   this.transformedTo = this.graph._addLink(newLink);

    this.graph.render();
}