export default function TransformedBy (Node, Links){
    this.node = Node;
    this.links = Links;
    
    Node.transformed(true);
    Links.forEach(function(Link){Link.transformed(true);});
}

TransformedBy.prototype = {
    constructor: TransformedBy,
    untransform: untransform,
    remove: remove
};

function remove (){
    this.node.remove();
    this.links.forEach(function(Link){Link.remove();});
}

function untransform (){
    this.node.transformed(false);
    this.links.forEach(function(Link){ Link.transformed(false);});
}