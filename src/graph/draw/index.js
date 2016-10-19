import drawNodes from "./drawNodes";
import drawLinks from "./drawLinks";


export default function () {
    this._ctx.clearRect(0, 0, 1500, 500);
    drawLinks.call(this);
    drawNodes.call(this);
}