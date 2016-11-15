export default function (currentNode) {
    this.getNodes(function(Node){ return Node.selected() || (Node === currentNode)})
    .forEach(function(Node){
        Node._nudge(d3.event.dx, d3.event.dy, true);
    });
    
    //this.render();
}