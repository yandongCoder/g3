export default function () {
    var exceptArr = ['_element', '_needMerged', '_needTransformed', 'graph', 'source', 'target'];
    var json = {};
    for (var prop in this) {
        if (prop === 'mergedBy') {
            json[prop] = this[prop].map(function(Link){return Link.id;});
            
        } else if (this.hasOwnProperty(prop) && (exceptArr.indexOf(prop) === -1)) {
            var jsonProp = prop.replace(/_/, "");
            json[jsonProp] = this[prop];
        }
    }
    
    return JSON.stringify(json);
}