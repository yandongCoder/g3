export default function () {
    if(!this.mergedBy) return;

    this.remove();

    this.mergedBy.forEach(function(Link){
        Link.merged(false);
        Link.NtoL();
    });
    
    return this;
}