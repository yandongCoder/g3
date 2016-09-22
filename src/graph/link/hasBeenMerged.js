export default function () {
    var hasBeenMerged = false;

    this.graph._links.forEach(function(Link){
        if(Link.mergedBy && (Link.mergedBy.indexOf(this) !== -1) ) hasBeenMerged = true;
    }, this);

    return hasBeenMerged;
}