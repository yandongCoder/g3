import toArray from "../utils/toArray";

//nodes could be: Node, [Node], Node id string, Node id array of string
export default function (nodes) {
    nodes = toArray(nodes);

    var removedIds = nodes.map(function(node){
        if(typeof node  ===  'object') return node.id;
        else return node;
    });

    var toRemovedLinks = this._links.filter(function (Link) {
        return  (removedIds.indexOf(Link.source.id) !== -1) || (removedIds.indexOf(Link.target.id) !== -1);
    });

    toRemovedLinks.map(function (Link) {
        this._links.splice(this._links.indexOf(Link), 1);
    }, this);

}