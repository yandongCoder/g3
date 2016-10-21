export default function (callback, drawType) {
    if(!this._ifRender) return this;

    this._init();

    var self = this;
    clearTimeout(this._renderDelay);
    this._renderDelay = setTimeout(function(){
        self._draw(drawType);
        if(callback instanceof Function) callback();
    }, 0);
    //console.log('render');
    return this;

}