import {DIRECTION} from "../graph/CONSTANT";

export default function direction(Links){
    var src = Links[0].getSourceId();
    var dst = Links[0].getTargetId();
    
    return Links.reduce(function(p, Link){
        if(p === DIRECTION.NONE) return Link.attr("direction");
        if(Link.attr("direction") === DIRECTION.NONE) return p;
        if(p === DIRECTION.DOUBLE || Link.attr("direction") === DIRECTION.DOUBLE) return DIRECTION.DOUBLE;
        
        if(Link.getSourceId() === src){
            if((p === DIRECTION.S2D && Link.attr("direction") === DIRECTION.D2S) || (p === DIRECTION.D2S && Link.attr("direction") === DIRECTION.S2D)) return DIRECTION.DOUBLE;
            else return p;
        }else{
            if((p === DIRECTION.S2D && Link.attr("direction") === DIRECTION.S2D) || (p === DIRECTION.D2S && Link.attr("direction") === DIRECTION.D2S)) return DIRECTION.DOUBLE;
            else return p;
        }
        
        if(p === Link.attr("direction")) return p;
    }, DIRECTION.NONE);
}