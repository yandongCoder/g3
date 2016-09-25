export default function () {
    this._links.forEach(function(Link){
        if(Link._needMerged) Link.flattenMerge();
        delete Link._needMerged;

        if(!Link.transformed() && Link.source.transformed()) Link.source.NtoL();
        if(!Link.transformed() && Link.target.transformed()) Link.target.NtoL();
    });
}