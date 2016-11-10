export default function MergedBy(Links) {
    Links.forEach(function(Link){
        Link.merged(true);
    });
    
    this.links = Links;
}

MergedBy.prototype = {
    constructor: MergedBy,
    remove: remove,
    unmerge: unmerge
};

function remove (){
    this.links.forEach(function(Link){Link.remove();});
}

function unmerge (){
    this.links.forEach(function(Link){
        Link.merged(false);
        Link.NtoL();
    });
}