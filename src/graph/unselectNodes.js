export default function (filter) {
    this.getNodes(filter).forEach(function(Node){
        Node.selected(false, true);
        this.render(true);
    }, this);
}