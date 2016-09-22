export default function () {
    if(!this.mergedBy) return;

    this.mergedBy.forEach(function(Link){
        Link.merged(false);
    });

    this.remove();

    return this;
}