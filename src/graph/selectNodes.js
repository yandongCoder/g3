export default function (filter, retainOther) {
    if(!retainOther) this.deselectNodes();
    this.getNodes(filter).forEach(function(Node){
        Node.selected(true);
    }, this);

    this.render();
}