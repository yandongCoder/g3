import DIRECTION from "../graph/link/direction";
import colorMixer from "../utils/colorMixer";
export default function (Links) {

    var obj = {};
    obj.id = "derived:" + concat("id");
    obj.label = concat("label");
    obj.width = average('width');
    obj.src = Links[0].src;
    obj.dst = Links[0].dst;
    obj.color = "#"+  colorMixer.mix(Links.map(function(Link){return Link.color()}));
    obj.direction = direction();
    
    function concat(key){
        return Links.map(function(Link){
            return Link[key] instanceof Function ? Link[key]() : Link[key];
        }).join("&");
    }

    function average(key){
        return Links.reduce(function(p, Link){
            return p + (Link[key] instanceof Function ? Link[key]() : Link[key]);
        }, 0) / Links.length;
    }

    function direction(){
        return Links.reduce(function(p, Link){
            if(p === DIRECTION.NONE) return Link.direction;
            if(Link.direction === DIRECTION.NONE) return p;
            if(p === DIRECTION.DOUBLE || Link.direction === DIRECTION.DOUBLE) return DIRECTION.DOUBLE;
            if((p === DIRECTION.FROM && Link.direction === DIRECTION.TO) || (p === DIRECTION.TO && Link.direction === DIRECTION.FROM)) return DIRECTION.DOUBLE;
            if(p === Link.direction) return p;
        }, DIRECTION.NONE);
    }
    return obj;
}
