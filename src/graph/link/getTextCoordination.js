//textCoordination is coordination minus Node's radius
export default function(){
    var coord = this.getCoordination();

    var l = Math.sqrt((coord.Tx - coord.Sx) * (coord.Tx - coord.Sx) + (coord.Ty - coord.Sy) * (coord.Ty - coord.Sy));
    var sin = (coord.Ty - coord.Sy) / l;
    var cos = (coord.Tx - coord.Sx) / l;


    if(!this.hasSourceArrow()){
        coord.Sx -= this.source.size() / 2 * cos;
        coord.Sy -= this.source.size() / 2 * sin;
    }

    if(!this.hasTargetArrow()){
        coord.Tx -= this.target.size() / 2 * cos;
        coord.Ty -= this.target.size() / 2 * sin;
    }

    return coord;
}