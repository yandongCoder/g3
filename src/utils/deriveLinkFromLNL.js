import Link from "../graph/link/index";
import deriveLinkFromLinks from "./deriveLinkFromLinks";
import direction from "../utils/deriveDirection";

export default function (srcLinks, Node, dstLinks, graph) {
    srcLinks = srcLinks.length > 1? new Link(deriveLinkFromLinks(srcLinks, graph), graph): srcLinks[0];
    dstLinks = dstLinks.length > 1? new Link(deriveLinkFromLinks(dstLinks, graph), graph): dstLinks[0];

    var obj = {};
    obj.id = "transformed:(" + srcLinks.id + ")" + Node.id + "(" + dstLinks.id + ")";
    obj.label = "(" + srcLinks.label() + ")" + Node.label() + "(" + dstLinks.label() + ")";
    obj.src = srcLinks.getSourceId() === Node.id? srcLinks.getTargetId(): srcLinks.getSourceId();
    obj.dst = dstLinks.getSourceId() === Node.id? dstLinks.getTargetId(): dstLinks.getSourceId();
    obj.width = (srcLinks.width() + dstLinks.width()) / 2;
    obj.color = Node.color();
    obj.direction = direction([srcLinks, dstLinks]);

    return obj;
}
