import toArray from "../utils/toArray";

//nodes could be: Node, [Node], Node id string, Node id array of string
export default function (nodes) {
    nodes = toArray(nodes);

    var removedIds = nodes.map(function(node){
        if(typeof node  ===  'object') return node.id;
        else return node;
    });

    this._nodes.forEach(function(Node){
        var index = removedIds.indexOf(Node.getId());
        if(index !== -1) {
            this._nodes.splice(index, 1);
        }
    }, this);

    this._removeLinksByNodes(removedIds);

    this.render();
}