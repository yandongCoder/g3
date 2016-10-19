import toArray from "../utils/toArray";

export default function (nodes, cover) {
    nodes = toArray(nodes);

    if(!arguments.length){
        return this._nodes;
    }

    if(cover){
        this.clearNodes();
    }
    console.time("addNodes");
    nodes.forEach(function(v){
        this._addNode(v);
    },this);
    console.timeEnd("addNodes");

    //this._preTransfer();

    this.render(true);
    
    return this;
}