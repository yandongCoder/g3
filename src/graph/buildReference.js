import {BUILD_REF_TYPE} from "./CONSTANT";
import GroupedBy from "./helper/groupedBy";
import MergedBy from "./helper/mergedBy";
import TransformedBy from "./helper/transformedBy";

export default function (type) {
    this._links.forEach(function (Link) {
        if(Link.mergedBy && !(Link.mergedBy instanceof MergedBy) ){
            var Links = this.getLinks(Link.mergedBy.links);
            
            if(Links.length === Link.mergedBy.links.length) Link.mergedBy = new MergedBy(Links);
        }
        
        if(Link.transformedBy && !(Link.transformedBy instanceof TransformedBy) ){
            var Node = this.getNodes(Link.transformedBy.node)[0];
                Links = this.getLinks(Link.transformedBy.links);
            
            if(Node && Links.length === Link.transformedBy.links.length) Link.transformedBy = new TransformedBy(Node, Links);
        }
    }, this);
    
    this._nodes.forEach(function (Node) {
        if(Node.groupedBy && (!(this.groupedBy instanceof GroupedBy)) ){
            var by = Node.groupedBy;
            var Nodes = this.getNodes(by.nodes);
            var Links = this.getLinks(by.links);
            var attachedLinks = this.getLinks(by.attachedLinks);
            
            if(Nodes.length === by.nodes.length && Links.length === by.links.length && attachedLinks.length === by.attachedLinks.length)
                Node.groupedBy = new GroupedBy(Node, Nodes, Links, attachedLinks);
            
        }
            
    }, this);
}
