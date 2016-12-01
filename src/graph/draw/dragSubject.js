/**
 * Created by lcx on 2016/11/1.
 */
export default function dragsubject() {
    // console.log('dragsubject');
    var transform = this.transform;

    var x = transform.invertX(d3.event.x);
    var y = transform.invertY(d3.event.y);

    var targetNode = findPoint(x,y);
    if(targetNode){
        targetNode.x = transform.applyX(targetNode.x);
        targetNode.y = transform.applyY(targetNode.y);
    }
    // console.log(targetNode);
    return targetNode;
}