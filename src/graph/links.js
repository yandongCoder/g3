import toArray from "../utils/toArray";
import {BUILD_REF_TYPE} from "./CONSTANT";

export default function (links, cover) {
    links = toArray(links);

    if(!arguments.length){
        return this._links;
    }

    if(cover){
        this.clearLinks();
    }

    links.forEach(function(v){
        this._addLink(v);
    },this);

    this.buildReference(BUILD_REF_TYPE.LINK);
    //this._preTransfer();
    
    this.render();
    
    return this;
}