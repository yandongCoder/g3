import {DIRECTION} from "../graph/CONSTANT";

export default function direction(Links){
    return Links.reduce(function(p, Link){
        if(p === DIRECTION.NONE) return Link.attr("direction");
        if(Link.attr("direction") === DIRECTION.NONE) return p;
        if(p === DIRECTION.DOUBLE || Link.attr("direction") === DIRECTION.DOUBLE) return DIRECTION.DOUBLE;
        if((p === DIRECTION.S2D && Link.attr("direction") === DIRECTION.D2S) || (p === DIRECTION.D2S && Link.attr("direction") === DIRECTION.S2D)) return DIRECTION.DOUBLE;
        if(p === Link.attr("direction")) return p;
    }, DIRECTION.NONE);
}