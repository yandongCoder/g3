export default function (filter) {
    this.getNodes(filter).forEach(function(Node){
        Node.selected(false);
        this.render();
    }, this);
    return this;
}