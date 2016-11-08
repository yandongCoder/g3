import {DIRECTION} from "../graph/link/CONSTANT";

export default function direction(Links){
    return Links.reduce(function(p, Link){
        if(p === DIRECTION.NONE) return Link.direction();
        if(Link.direction() === DIRECTION.NONE) return p;
        if(p === DIRECTION.DOUBLE || Link.direction() === DIRECTION.DOUBLE) return DIRECTION.DOUBLE;
        if((p === DIRECTION.S2D && Link.direction() === DIRECTION.D2S) || (p === DIRECTION.D2S && Link.direction() === DIRECTION.S2D)) return DIRECTION.DOUBLE;
        if(p === Link.direction()) return p;
    }, DIRECTION.NONE);
}