import {RENDER_TYPE} from "./CONSTANT";

export default function (callback, renderType) {
    if(!this.config.ifRender) return this;

    var canvasType = this._canvas.nodeName;

    if(canvasType === 'svg'){
        this._init();
    }

    var self = this;
    clearTimeout(this._renderDelay);
    
    if(renderType === RENDER_TYPE.ZOOM) draw();
    else this._renderDelay = setTimeout(draw, 0);
    
    return this;
    
    function draw(){
        self._draw(renderType, canvasType);
        if(callback instanceof Function) callback();
    }
}