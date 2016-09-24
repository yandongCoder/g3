import DIRECTION from "../graph/link/DIRECTION-CONSTANT";

export default function direction(Links){
    return Links.reduce(function(p, Link){
        if(p === DIRECTION.NONE) return Link.direction();
        if(Link.direction() === DIRECTION.NONE) return p;
        if(p === DIRECTION.DOUBLE || Link.direction() === DIRECTION.DOUBLE) return DIRECTION.DOUBLE;
        if((p === DIRECTION.FROM && Link.direction() === DIRECTION.TO) || (p === DIRECTION.TO && Link.direction() === DIRECTION.FROM)) return DIRECTION.DOUBLE;
        if(p === Link.direction()) return p;
    }, DIRECTION.NONE);
}