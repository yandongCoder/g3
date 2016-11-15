export default function () {
    var exceptArr = ['_element', '_pathEle', '_labelEle', '_needMerged', '_needTransformed', 'graph', 'source', 'target'];
    var json = {};
    for (var prop in this) {
        if (prop === 'mergedBy') {
            json[prop] = {links: []};
            this[prop].links.map(function(Link){ json[prop].links.push(Link.id);});
            
        } else if(prop === 'src'){
            json[prop] = this.source.id || this[prop];
        } else if(prop === 'dst'){
            json[prop] = this.target.id || this[prop];
        } else if(prop === 'transformedBy'){
            json[prop] = {node: this[prop].node.id, links: []};
            this[prop].links.map(function(Link){ json[prop].links.push(Link.id);});
            
        } else if (this.hasOwnProperty(prop) && (exceptArr.indexOf(prop) === -1)) {
            var jsonProp = prop.replace(/_/, "");
            json[jsonProp] = this[prop];
        }
    }
    
    return json;
}