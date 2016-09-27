export default function () {
    this.graph._links.splice(this.graph._links.indexOf(this), 1);

    this.graph.render(true);

    return this;
}