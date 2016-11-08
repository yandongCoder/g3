export default function () {
    var json = {};
    for (var prop in this) {
        if (prop === 'groupedBy') {
            json[prop] = this[prop].getOnlyId();
            
        } else if (this.hasOwnProperty(prop) && (prop !== "_element") && (prop !== "_needTransformed")) {
            var jsonProp = prop.replace(/_/, "");
            json[jsonProp] = this[prop];
        }
    }
    
    return JSON.stringify(json);
}