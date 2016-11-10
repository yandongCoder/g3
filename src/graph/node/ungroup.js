import {REMOVE_TYPE} from "./CONSTANT";
import GroupedBy from "./GroupedBy";

export default function () {
    if(!this.groupedBy || this.grouped()) return;
    if(! (this.groupedBy instanceof GroupedBy)){
        var by = this.groupedBy;
        var Nodes = this.graph.getNodes(by.nodes);
        var Links = this.graph.getLinks(by.links);
        var attachedLinks = this.graph.getLinks(by.attachedLinks);
        
        this.groupedBy = new GroupedBy(this, Nodes, Links, attachedLinks);
    }
    
    this.groupedBy.ungroup();

    this.remove(REMOVE_TYPE.UNGROUP);

    this.graph.render();
    return this;
}