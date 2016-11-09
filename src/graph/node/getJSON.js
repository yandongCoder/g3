export default function () {
    var exceptArr = ['_element', '_needTransformed', 'graph'];
    var json = {};
    for (var prop in this) {
        if (prop === 'groupedBy') {
            json[prop] = this[prop].pickIds();
    
        } else if (this.hasOwnProperty(prop) && (exceptArr.indexOf(prop) === -1)) {
            var jsonProp = prop.replace(/_/, "");
            json[jsonProp] = this[prop];
        }
    }
    
    return json;
}