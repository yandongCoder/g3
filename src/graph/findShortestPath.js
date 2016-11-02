import findShortestPath from "../utils/findShortestPath";

export default function (fromNode, toNode) {
    var res = findShortestPath(fromNode, toNode, this.getRenderedNodes(), this.getRenderedLinks());

    return {
        distance: res._distance,
        nodes: this.getNodes(res._nodesInPath),
        links: this.getLinks(res._linksInPath)
    }
}

