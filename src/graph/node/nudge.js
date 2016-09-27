export default function (nudgeX, nudgeY) {
    this.x += nudgeX;
    this.y += nudgeY;
    this.graph.render(true);
    return this;
}