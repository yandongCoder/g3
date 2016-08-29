export default function (data) {
    if(!arguments.length){
        return data;
    }
    this._data = data;
    return this;
}