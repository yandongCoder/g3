//nodes could be: Node, [Node], Node id string, Node id array of string
export default function (nodes) {

    //remove links first
    this._removeLinksByNodes(nodes);

    this.getNodes(nodes).forEach(function(Node){
        this._nodes.splice(this._nodes.indexOf(Node), 1);
    }, this);

    this.render();

}