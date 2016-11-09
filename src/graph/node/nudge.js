export default function (nudgeX, nudgeY) {
    if(!this.graph.config.movable) return;
    
    this.x += nudgeX;
    this.y += nudgeY;

    this.graph.render();

    return this;
}