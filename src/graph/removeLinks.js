//links could be: Link, [Link], Link id string, Link id array of string
export default function (links) {
    this.getLinks(links).forEach(function(Link){
        this._links.splice(this._links.indexOf(Link), 1);
    }, this);
    
    this.render();
}