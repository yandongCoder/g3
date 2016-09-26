export default function () {
    this._links.forEach(function(Link){
        if(Link._needMerged) Link.flattenMerge();
        delete Link._needMerged;
        Link.NtoL();
    });

    this._nodes.forEach(function(Node){
        if(Node._needTransformed) Node.NtoL();
        delete Node._needTransformed;
    });
}