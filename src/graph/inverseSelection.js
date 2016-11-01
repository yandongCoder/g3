export default function () {
    var Nodes = this.getRenderedNodes();
    for(var i = Nodes.length; i--;){
        Nodes[i].selected(!Nodes[i].selected());
    }
}