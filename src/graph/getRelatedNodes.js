export default function (filter) {
    var Nodes = this.getNodes(filter);
    var argLength = Nodes.length;

    for (var i = 0; i < Nodes.length; i++) {
        var adjList = getAdjNode(Nodes[i], this);
        adjList.forEach(function (Node) {
            if (Nodes.indexOf(Node) === -1) {
                Nodes.push(Node);
            }
        });
    }

    //minus original Nodes
    Nodes = Nodes.filter(function(Node, i){
        return i >= argLength;
    });
    return Nodes;
}

function getAdjNode(Node, self) {
    var Nodes = [];
    self.getRenderedLinks().forEach(function (Link) {
        if (Link.source === Node && (Nodes.indexOf(Link.target) === -1)) {
            Nodes.push(Link.target);
        } else if (Link.target === Node && (Nodes.indexOf(Link.source) === -1)) {
            Nodes.push(Link.source);
        }
    });
    return Nodes;
}