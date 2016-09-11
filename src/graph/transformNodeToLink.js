//nodes could be: Node, [Node], Node id string, Node id array of string
export default function (nodes) {
    this.getNodes(nodes).forEach(function (Node) {
        Node.transformToLink();

        this.getLinksByNodes(Node).forEach(function(Link){
           //Link.transformToLink();
        });
    }, this);

    this.render();
}