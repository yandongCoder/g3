export default function () {
    if(!this.groupedBy || this.grouped()) return;

    this.groupedBy.nodes.forEach(function(Node){
        Node.grouped(false);
    });
    this.groupedBy.links.forEach(function(Link){
        Link.grouped(false);
    });
    this.groupedBy.attachedLinks.forEach(function(attachedLink){
        if(attachedLink.originalSource) attachedLink.link.source = attachedLink.originalSource;
        else attachedLink.link.target = attachedLink.originalTarget;
    });

    this.remove();

    this.graph.render();
    return this;
}