export default function (Nodes) {
    var ids = Nodes.map(function(Node){return Node.id});
    
    return this._links.filter(function(Link){
        return (ids.indexOf(Link.source.id) !== -1) && (ids.indexOf(Link.target.id) !== -1);
    });
}