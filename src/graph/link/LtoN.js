import {LINK_REMOVE_TYPE} from "./CONSTANT";

export default function () {
    if(!this.transformedBy) return;
    this.transformedBy.node.transformed(false);

    this.transformedBy.links.forEach(function(Link){
        Link.transformed(false);
    });

    this.remove(LINK_REMOVE_TYPE.L2N);

    return this;
}