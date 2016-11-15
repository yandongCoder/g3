import Link from "../graph/link/index";
import deriveLinkFromLinks from "./deriveLinkFromLinks";
import direction from "../utils/deriveDirection";

export default function (srcLinks, Node, dstLinks, graph) {
    srcLinks = srcLinks.length > 1? new Link(deriveLinkFromLinks(srcLinks), graph): srcLinks[0];
    dstLinks = dstLinks.length > 1? new Link(deriveLinkFromLinks(dstLinks), graph): dstLinks[0];

    var obj = {};
    obj.id = "transformed:(" + srcLinks.id + ")" + Node.id + "(" + dstLinks.id + ")";
    obj.label = "(" + srcLinks.label() + ")" + Node.label() + "(" + dstLinks.label() + ")";
    obj.src = srcLinks.source.id === Node.id? srcLinks.target.id: srcLinks.source.id;
    obj.dst = dstLinks.source.id === Node.id? dstLinks.target.id: dstLinks.source.id;
    obj.width = (srcLinks.width() + dstLinks.width()) / 2;
    obj.color = Node.color();
    obj.direction = direction([srcLinks, dstLinks]);

    return obj;
}
