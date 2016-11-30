import attr from "./attr";
import data from "./data";

export default function Selection(arr) {
    this.arr = arr;
}

Selection.prototype = {
    constructor: Selection,
    attr: attr,
    data: data
};