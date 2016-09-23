export default function () {
    this._links.forEach(function(Link){
        if(Link._needMerged) Link.flattenMerge();
        delete Link._needMerged;
    });
}