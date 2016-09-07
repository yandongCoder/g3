import toArray from "../utils/toArray";

//links could be: Link, [Link], Link id string, Link id array of string
export default function (links) {
    links = toArray(links);

    var removedIds = links.map(function(link){
        if(typeof link  ===  'object') return link.id;
        else return link;
    });

    this._links.forEach(function(Link){
        var index = removedIds.indexOf(Link.getId());
        if(index !== -1) this._links.splice(index, 1);
    }, this);

    this.render();
}