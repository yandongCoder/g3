export default function (filter) {
    this.getNodes(filter).forEach(function(Node){
        Node.selected(true, true);
        this.render();
    }, this);
}