export default function (nodeFilter, linkFilter) {
    var json = {
        translate: this._getCurrentTranslate(),
        scale: this._getCurrentScale(),
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