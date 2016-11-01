import colorMixer from "../utils/colorMixer";
import concat from "../utils/deriveConcat";
import average from "../utils/deriveAverage";

export default function (Nodes) {
    var obj = {};
    obj.id = "grouped:" + concat("id", Nodes);
    obj.label = concat("label", Nodes);
    obj.radius = average('radius', Nodes);
    obj.x = average('x', Nodes);
    obj.y = average('y', Nodes);
    obj.color = "#"+  colorMixer.mix(Nodes.map(function(Link){return Link.color()}));
    obj.selected = Nodes.every(function(Node){ return Node.selected()});

    return obj;
}