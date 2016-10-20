export default function (forceDraw, drawType) {
    if(forceDraw && !this._autoRender) return this;

    //clearTimeout(this._renderDelay);
    //this._renderDelay = setTimeout(function(){
    this._init();
    this._draw(drawType);
    //}.bind(this),0);
        //console.log('render');

    return this;

}