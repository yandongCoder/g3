export default function (obj) {
    var ids = this._nodes.map(function(Node){return Node.id});

    return ids.indexOf(obj.id) !== -1;
}