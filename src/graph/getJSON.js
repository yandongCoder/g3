export default function () {
    var json = {
        translate: this._getCurrentTranslate(),
        scale: this._getCurrentScale(),
        nodes: [],
        links: []
    };
    this.getNodes().forEach(function(Node){
       json.nodes.push(Node.getJSON());
    });
    this.getLinks().forEach(function (Link) {
        json.links.push(Link.getJSON());
    });
    return json;
}