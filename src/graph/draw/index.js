import drawNodes from "./drawNodesSvg";
import drawLinks from "./drawLinksSvg";

export default function (drawType) {
    drawNodes.call(this, drawType);
    drawLinks.call(this, drawType);
}