import drawNodesSvg from "./drawNodesSvg";
import drawLinksSvg from "./drawLinksSvg";
import drawCanvas from "./drawCanvas";

export default function (drawType, canvasType) {
    if(canvasType === 'svg'){
        drawNodesSvg.call(this, drawType);
        drawLinksSvg.call(this, drawType);
    }else if(canvasType === 'CANVAS'){
        drawCanvas.call(this);
    }
}
