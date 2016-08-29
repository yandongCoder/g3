export default function (links) {
    if(!arguments.length){
        return this._links;
    }
    this._links = links;
    return this;
}