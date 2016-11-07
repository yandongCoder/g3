export default function (filter) {
    return this.getNodes(filter)
        .filter(function(Node){ return !Node.grouped() });
}