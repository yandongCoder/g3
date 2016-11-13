export default function (nudgeX, nudgeY) {
    if(!this.graph.config.dragable) return;
    
    this.x += nudgeX;
    this.y += nudgeY;

    return this;
}