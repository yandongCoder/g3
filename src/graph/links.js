export default function (links, cover) {
    if(!Array.isArray(links)){
        links = [links];
    }

    if(!arguments.length){
        return this._links;
    }

    if(cover){
        this.clearLinks();
    }

    links.forEach(function(v){
        this.addLink(v);
    },this);
    
    return this;
}