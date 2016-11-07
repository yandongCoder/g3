export default function (filter) {
    var Nodes = this.getUngroupedNodes(filter);

    if(Nodes.length <= 1) return;

    var ungroupedNodes = [];
    
    Nodes.forEach(function(Node){
        ungroupNode(Node);
    });
    
    this.group(ungroupedNodes);
    
    
    function ungroupNode (Node){
        if(Node.groupedBy){
            Node.ungroup();
            Node.groupedBy.nodes.forEach(function(Node){
                ungroupNode(Node);
            });
        }else{
            ungroupedNodes.push(Node);
        }
    }
}
