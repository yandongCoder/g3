import {RENDER_TYPE} from "./CONSTANT";
import select from "../utils/select";

function delayRender(Obj, renderType){
    this.updateDOM.addObj(Obj, renderType);
    this._render(renderType);
    return this;
}

function render(renderType){
    this._render(renderType || RENDER_TYPE.IMMEDIATELY);
    return this;
}

function _render(renderType) {
    var self = this;
    
    this.element = select(this._selector);
    
    if(!this.element) return this;
    if(!this._config.ifRender) return this;
    var canvasType = this.element.nodeName;
    if(canvasType === 'svg'){ this._init();}
    
    if(renderType === RENDER_TYPE.IMMEDIATELY || renderType === RENDER_TYPE.ZOOM){
        draw(renderType);
    }
    else{
        cancelAnimationFrame(this._renderDelay);
        this._renderDelay = requestAnimationFrame(function timeoutDraw(){draw(renderType)}, 0);
    }
    
    return this;
    
    function draw(renderType){
        self._draw(renderType, canvasType);
    }
}

export {_render, delayRender, render};