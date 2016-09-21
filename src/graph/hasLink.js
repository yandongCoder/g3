export default function (obj) {
    var ids = this._links.map(function(Link){return Link.id});

    return ids.indexOf(obj.id) !== -1;
}