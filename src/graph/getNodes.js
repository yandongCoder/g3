import filterBy from "../utils/filterBy";

export default function (filter) {
    return filterBy(filter, this._nodes);
}