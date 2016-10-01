export default function (obj) {
    return this._nodesHash[obj.id]? true: false;
}