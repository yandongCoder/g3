import {RENDER_TYPE} from "./CONSTANT";

function delayRender(Obj, renderType){
    this.updateDOM.addObj(Obj, renderType);
    this.render();
}

function renderImmediately(){
    this.render(RENDER_TYPE.IMMEDIATELY);
}

function render(renderType) {
    var self = this;
    
    if(!this.config.ifRender) return this;
    var canvasType = this._canvas.nodeName;
    if(canvasType === 'svg'){ this._init();}
    
    if(renderType === RENDER_TYPE.IMMEDIATELY){
        draw(renderType);
    }
    else{
        clearTimeout(this._renderDelay);
        this._renderDelay = setTimeout(draw, 0);
    }
    
    return this;
    
    function draw(renderType){
        self._draw(renderType, canvasType);
    }
}

export {render, delayRender, renderImmediately};