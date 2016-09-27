import getIds from "../utils/getIds";

export default function (Nodes) {
    var ids = getIds(Nodes);
    return this._links.filter(function(Link){
        return (ids.indexOf(Link.source.id) !== -1) && (ids.indexOf(Link.target.id) !== -1);
    });
}