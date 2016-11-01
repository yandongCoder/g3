export default function (callback, drawType) {
    if(!this.config.ifRender) return this;

    var canvasType = this._canvas.nodeName;

    if(canvasType === 'svg'){
        this._init();
    }

    var self = this;
    clearTimeout(this._renderDelay);
    this._renderDelay = setTimeout(function(){
        self._draw(drawType, canvasType);
        if(callback instanceof Function) callback();
    }, 0);
    return this;
}