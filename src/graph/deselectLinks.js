export default function (filter) {
    this.getLinks(filter).forEach(function(Link){
        Link.selected(false);
        this.render();
    }, this);
}