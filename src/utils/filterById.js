export default function (id, Nodes) {
    for(var i = Nodes.length; i--;){
        if(Nodes[i]['id'] === id) {
            var Node = Nodes[i];
            break;
        }
    }
    return Node;
}