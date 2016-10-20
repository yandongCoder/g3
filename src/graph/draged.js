import DRAWTYPE from "./draw/DRAWTYPE";

export default function (currentNode) {
    this.getNodes(function(Node){ return Node.selected() || (Node === currentNode)})
    .forEach(function(Node){
        Node.nudge(d3.event.dx, d3.event.dy, true);
    });

    this.render(true, DRAWTYPE.NUDGE);
}