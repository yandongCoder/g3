export default function () {
    delete this.graph._nodesHash[this.id];
    this.graph._nodes.splice(this.graph._nodes.indexOf(this), 1);
}