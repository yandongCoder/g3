export default function (grouped) {
    if(!arguments.length) return this._grouped === undefined? false : this._grouped;

    this._grouped = grouped;

    return this;
}