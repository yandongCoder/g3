export default function (transformed) {
    if(!arguments.length) return this._transformed || false;

    this._transformed = transformed;

    return this;
}