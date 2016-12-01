export default function (prop, val) {
    this.arr.forEach(function(datum){
        datum.attr(prop, val instanceof Function? val(datum): val);
    });
    return this;
}
