export default function (link) {
    var ids = this._links.map(function(d){return d.id});

    return ids.indexOf(link.id) !== -1;
}