export default function (internalCall) {
    if(internalCall && !this._autoRender) return;
    //clearTimeout(this._renderDelay);
    //this._renderDelay = setTimeout(function(){
    this._init();
    this._draw();
    //}.bind(this),0);
        //console.log('render');

    return this;

}