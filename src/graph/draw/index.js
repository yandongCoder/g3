import drawNodesSvg from "./drawNodesSvg";
import drawLinksSvg from "./drawLinksSvg";
import drawCanvas from "./drawCanvas";

export default function (renderType, canvasType) {
    if(canvasType === 'svg'){
        drawNodesSvg.call(this, renderType);
        drawLinksSvg.call(this, renderType);
    }else if(canvasType === 'CANVAS'){
        drawCanvas.call(this);
    }
}
