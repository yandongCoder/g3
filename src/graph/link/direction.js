export default function (direction) {
    if(!arguments.length) return this._direction;

    this._direction = direction;
    this.graph.render(true);

    return this;
}