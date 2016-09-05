export default function (node) {
    var ids = this._nodes.map(function(d){return d.id});

    return ids.indexOf(node.id) !== -1;
}