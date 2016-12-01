export default function findPoint(nodes,x, y) {
    var i,

        x = x,
        y = y,
        dx,
        dy;

    // var nodes = this.getRenderedNodes();

    for (i = nodes.length - 1; i >= 0; --i) {
        var r = nodes[i].radius();
        var point = nodes[i];
        var xx = point.x;
        var yy = point.y;

        // var xx = transform.applyX(point.x);
        // var yy = transform.applyY(point.y);

        dx = x - xx;
        dy = y - yy;
        if (dx * dx + dy * dy < r*r) {
            return point;
        }
    }
}