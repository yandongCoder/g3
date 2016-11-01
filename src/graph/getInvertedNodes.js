export default function (filter) {
    var Nodes = this.getNodes(filter);
    return this.getRenderedNodes().filter(function(Node){
        return Nodes.indexOf(Node) === -1;
    });
}