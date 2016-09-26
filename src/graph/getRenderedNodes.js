export default function () {
    return this.getNodes(function(Node){
        return !Node.transformed() && !Node.grouped();
    });
}