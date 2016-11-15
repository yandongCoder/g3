export default function () {
    var exceptKey = ['_element', '_pathEle', '_labelEle', '_needMerged', '_needTransformed', 'graph'];
    var json = {};
    for (var prop in this) {
        if (prop === 'mergedBy') {
            json[prop] = {links: []};
            this[prop].links.map(function(Link){ json[prop].links.push(Link.id);});
            
        } else if(prop === 'source'){
            json['src'] = this.getSourceId();
        } else if(prop === 'target'){
            json['dst'] = this.getTargetId();
        } else if(prop === 'transformedBy'){
            json[prop] = {node: this[prop].node.id, links: []};
            this[prop].links.map(function(Link){ json[prop].links.push(Link.id);});
            
        } else if (this.hasOwnProperty(prop) && (exceptKey.indexOf(prop) === -1)) {
            var jsonProp = prop.replace(/_/, "");
            json[jsonProp] = this[prop];
        }
    }
    
    return json;
}
