export default function (callback, drawType) {
    if(!this.config.ifRender) return this;

    this._init();

    var self = this;
    clearTimeout(this._renderDelay);
    this._renderDelay = setTimeout(function(){
        self._draw(drawType);
        if(callback instanceof Function) callback();
    }, 0);
    return this;
}