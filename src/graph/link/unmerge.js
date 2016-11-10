import {LINK_REMOVE_TYPE} from "../CONSTANT";

export default function () {
    if(!this.mergedBy) return;

    this.remove(LINK_REMOVE_TYPE.UNMERGE);

    this.mergedBy.unmerge();
    
    return this;
}