export default function () {
    var json = {};
    for (var prop in this) {
        if (prop === 'groupedBy') {
            json[prop] = {nodes: [], links: [], attachedLinks: []};
            this[prop].nodes.forEach(function(Node){json[prop].nodes.push(Node.id);});
            this[prop].links.forEach(function(Link){json[prop].links.push(Link.id);});
            this[prop].attachedLinks.forEach(function(obj){
                json[prop].attachedLinks.push({link: obj.link.id, originalSource: obj.originalSource.id});
            });
            
        } else if (this.hasOwnProperty(prop) && (prop !== "_element") && (prop !== "_needTransformed")) {
            var jsonProp = prop.replace(/_/, "");
            json[jsonProp] = this[prop];
        }
    }
    
    return JSON.stringify(json);
}