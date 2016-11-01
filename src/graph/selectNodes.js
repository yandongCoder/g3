export default function (filter, unselectOther) {
    if(unselectOther) this.unselectNodes();
    this.getNodes(filter).forEach(function(Node){
        Node.selected(true);
    }, this);

    this.render();
}