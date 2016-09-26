import Link from "../graph/link/index";
import deriveLinkFromLinks from "./deriveLinkFromLinks";
import direction from "../utils/deriveDirection";

export default function (srcLinks, Node, dstLinks) {
    srcLinks = srcLinks.length > 1? new Link(deriveLinkFromLinks(srcLinks)): srcLinks[0];
    dstLinks = dstLinks.length > 1? new Link(deriveLinkFromLinks(dstLinks)): dstLinks[0];

    var obj = {};
    obj.id = "transformed:(" + srcLinks.id + ")" + Node.id + "(" + dstLinks.id + ")";
    obj.label = "(" + srcLinks.label() + ")" + Node.label() + "(" + dstLinks.label() + ")";
    obj.src = srcLinks.src === Node.id? srcLinks.dst: srcLinks.src;
    obj.dst = dstLinks.src === Node.id? dstLinks.dst: dstLinks.src;
    obj.width = (srcLinks.width() + dstLinks.width()) / 2;
    obj.color = Node.color();
    obj.direction = direction([srcLinks, dstLinks]);

    return obj;
}