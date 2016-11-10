import toArray from "../utils/toArray";
import {BUILD_REF_TYPE} from "./CONSTANT";

export default function (nodes, cover) {
    nodes = toArray(nodes);

    if(!arguments.length){
        return this._nodes;
    }

    if(cover){
        this.clearNodes();
    }

    nodes.forEach(function(v){
        this._addNode(v);
    },this);

    this.buildReference(BUILD_REF_TYPE.NODE);
    //this._preTransfer();

    this.render();
    
    return this;
}