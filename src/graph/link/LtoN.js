export default function () {
    if(!this.transformedBy) return;
    this.transformedBy.node.transformed(false);

    this.transformedBy.links.forEach(function(Link){
        Link.transformed(false);
    });

    this.remove();

    return this;
}