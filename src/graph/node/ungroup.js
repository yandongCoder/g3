export default function () {
    if(!this.groupedBy || this.grouped()) return;

    this.groupedBy.nodes.forEach(function(Node){
        Node.grouped(false);
    });
    this.groupedBy.links.forEach(function(Link){
        Link.grouped(false);
    });

    this.remove();

    this.graph.render(true);
    return this;
}