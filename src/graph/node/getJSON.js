export default function () {
    var exceptKey = ['_element', '_needTransformed', 'graph', 'objectData'];
    var json = {};
    for (var prop in this) {
        if (prop === 'groupedBy') {
            json[prop] = this[prop].pickIds();
    
        } else if (this.hasOwnProperty(prop) && (exceptKey.indexOf(prop) === -1)) {
            var jsonProp = prop.replace(/_/, "");
            json[jsonProp] = this[prop];
        }
    }
    
    return json;
}