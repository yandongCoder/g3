export default function average(key, objArray){
    return objArray.reduce(function(p, obj){
            return p + (obj[key] instanceof Function ? obj[key]() : obj[key]);
        }, 0) / objArray.length;
}