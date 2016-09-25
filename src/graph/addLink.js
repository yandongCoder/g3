import Link from "./link/index";

export default function (obj) {
    var link = new Link(obj, this);
    if(!this.hasLink(link) && link.hasST()) this._links.push(link);

    return link;
}
