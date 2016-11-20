export default function (nodeFilter, linkFilter) {
    var transform = this.getCurrentTransform();
    var json = {
        translate: [transform.x, transform.y],
        scale: transform.k,
        nodes: [],
        links: []
    };
    this.getNodes(nodeFilter).forEach(function(Node){
       json.nodes.push(Node.getJSON());
    });
    this.getLinks(linkFilter).forEach(function (Link) {
        json.links.push(Link.getJSON());
    });
    return json;
}
