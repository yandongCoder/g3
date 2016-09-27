import toArray from "../utils/toArray";

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

    this.render(true);
    
    return this;
}