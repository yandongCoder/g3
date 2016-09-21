export default function (id, Nodes) {
    return Nodes.filter(function(Node){
        return Node.id === id;
    })[0];
}