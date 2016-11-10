import {LINK_REMOVE_TYPE} from "../CONSTANT";

export default function () {
    if(!this.transformedBy) return;
    
    this.transformedBy.untransform();

    this.remove(LINK_REMOVE_TYPE.L2N);

    return this;
}