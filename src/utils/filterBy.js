import toArray from "./toArray";
import getIds from "./getIds";

//filter array of object which has id; filtered by id, or id array, or object that has id, or object array
//this function is convenient to Nodes or Links data.
export default function (filter, objArray) {
    if(typeof filter === "function"){
        var filtered = filter;
    }else{
        var ids = getIds(toArray(filter));

        filtered = function(v){
            return ids.indexOf(v.id) !== -1;
        };
    }
    return objArray.filter(filtered);
}