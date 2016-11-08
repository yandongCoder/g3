import {REMOVE_TYPE} from "./CONSTANT";
export default function () {
    if(!this.groupedBy || this.grouped()) return;

    this.groupedBy.ungroup();

    this.remove(REMOVE_TYPE.UNGROUP);

    this.graph.render();
    return this;
}