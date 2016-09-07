export default function (nodes, cover) {
    if(!Array.isArray(nodes)){
        nodes = [nodes];
    }

    if(!arguments.length){
        return this._nodes;
    }

    if(cover){
        this.clearNodes();
    }

    nodes.forEach(function(v){
        this.addNode(v);
    },this);

    this.render();
    
    return this;
}