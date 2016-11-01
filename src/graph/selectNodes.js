export default function (filter, unselectOther) {
    if(unselectOther){
        this.getSelectedNodes().forEach(function(Node){
            Node.selected(false);
        });
    }
    this.getNodes(filter).forEach(function(Node){
        Node.selected(true);
    }, this);

    this.render();
}