import toArray from "../utils/toArray";

export default function (links, cover) {
    links = toArray(links);

    if(!arguments.length){
        return this._links;
    }

    if(cover){
        this.clearLinks();
    }

    links.forEach(function(v){
        this.addLink(v);
    },this);

    this.render();
    
    return this;
}