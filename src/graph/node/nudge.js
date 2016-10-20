export default function (nudgeX, nudgeY, notRender) {
    this.x += nudgeX;
    this.y += nudgeY;

    if(!notRender) this.graph.render(true);

    return this;
}