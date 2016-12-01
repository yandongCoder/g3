import {RENDER_TYPE} from "./CONSTANT";
import select from "../utils/select";

function delayRender(Obj, renderType){
    this.updateDOM.addObj(Obj, renderType);
    this.render(renderType);
    return this;
}

function renderImmediately(){
    this.render(RENDER_TYPE.IMMEDIATELY);
    return this;
}

function render(renderType) {
    var self = this;
    
    this._canvas = select(this._selector);
    
    if(!this._canvas) return this;
    if(!this._config.ifRender) return this;
    var canvasType = this._canvas.nodeName;
    if(canvasType === 'svg'){ this._init();}
    
    if(renderType === RENDER_TYPE.IMMEDIATELY){
        draw(renderType);
    }
    else{
        clearTimeout(this._renderDelay);
        this._renderDelay = setTimeout(function timeoutDraw(){draw(renderType)}, 0);
    }
    
    return this;
    
    function draw(renderType){
        console.log('draw');
        self._draw(renderType, canvasType);
    }
}

export {render, delayRender, renderImmediately};