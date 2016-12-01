/**
 * Created by lcx on 2016/11/7.
 */
export default function (context,links, x, y) {
    // console.log(links);
    var isTarget = context.isPointInPath(x,y);
    console.log(isTarget);

}
