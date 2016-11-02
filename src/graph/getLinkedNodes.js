import DIRECTION from "./link/DIRECTION-CONSTANT";

export default function (filter, type) {
    var Nodes = this.getNodes(filter);

    var relatedNodes = [];

    this.getRenderedLinks().forEach(function (Link) {
        if(type === 'none' && Link.direction() !== DIRECTION.NONE) return;
        if(type === 'double' && Link.direction() !== DIRECTION.DOUBLE) return;
        if (Nodes.indexOf(Link.source) !== -1) {
            if(type === 'in' && Link.direction() !== DIRECTION.D2S) return;
            if(type === 'out' && Link.direction() !== DIRECTION.S2D) return;
            relatedNodes.push(Link.target);
        }
        if (Nodes.indexOf(Link.target) !== -1) {
            if(type === 'in' && Link.direction() !== DIRECTION.S2D) return;
            if(type === 'out' && Link.direction() !== DIRECTION.D2S) return;
                relatedNodes.push(Link.source);
        }
    });

    return relatedNodes;
}