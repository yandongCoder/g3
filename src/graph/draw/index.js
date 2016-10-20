import drawNodes from "./drawNodes";
import drawLinks from "./drawLinks";

export default function (drawType) {
    drawNodes.call(this, drawType);
    drawLinks.call(this, drawType);
}