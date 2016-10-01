export default function (obj) {
    return this._linksHash[obj.id]? true: false;
}