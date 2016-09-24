export default function(key, objArray){
    return objArray.map(function(obj){
        return obj[key] instanceof Function ? obj[key]() : obj[key];
    }).join("&");
}