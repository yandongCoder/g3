export default function () {
    return this.getNodes(function(Node){
        return !Node._transformed;
    });
}