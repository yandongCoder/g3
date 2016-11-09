export default function (nudgeX, nudgeY) {
    if(!this.graph.config.dragable) return;
    
    this.x += nudgeX;
    this.y += nudgeY;

    this.graph.render();

    return this;
}