export default function (filter, retainOther) {
    if(!retainOther) this.unselectNodes();
    this.getNodes(filter).forEach(function(Node){
        Node.selected(true);
    }, this);

    this.render();
}