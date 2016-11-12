import {LINK_REMOVE_TYPE} from "../CONSTANT";

function LtoN() {
    if(!this.transformedBy) return;
    
    this.transformedBy.untransform();

    this.remove(LINK_REMOVE_TYPE.L2N);

    return this;
}

function NtoL() {
    if(!this.transformed() && this.source.transformed()) this.source.NtoL();
    if(!this.transformed() && this.target.transformed()) this.target.NtoL();
}

export {LtoN, NtoL};