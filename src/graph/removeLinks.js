//links could be: Link, [Link], Link id string, Link id array of string
export default function (links) {
    this.getLinks(links).forEach(function(Link){
        Link.remove();
    }, this);

    this.render(true);
}