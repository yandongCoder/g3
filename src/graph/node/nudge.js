export default function (nudgeX, nudgeY) {
    if(!this.graph._config.dragable) return;
    
    this.x += nudgeX;
    this.y += nudgeY;
    
    return this;
}