import colorMixer from "../utils/colorMixer";
import concat from "../utils/deriveConcat";
import average from "../utils/deriveAverage";
import direction from "../utils/deriveDirection";

export default function (Links) {

    var obj = {};
    obj.id = "derived:" + concat("id", Links);
    obj.label = concat("label", Links);
    obj.width = average('width', Links);
    obj.src = Links[0].src;
    obj.dst = Links[0].dst;
    obj.color = "#"+  colorMixer.mix(Links.map(function(Link){return Link.color()}));
    obj.direction = direction(Links);


    
    return obj;
}
