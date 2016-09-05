import drawNodes from "./drawNodes";
import drawLinks from "./drawLinks";


export default function () {
    drawNodes.call(this);
    drawLinks.call(this);
}