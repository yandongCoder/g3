export default function (height) {
    if(!arguments.length) {
        return this._height;
    }
    this._height = height;

    return this;
}