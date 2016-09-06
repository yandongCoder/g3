export default function (Xs, Ys, Xd, Yd, offsetLength) {
    var offsetScale = d3.scaleLinear().domain([1, 20]).range([25, 50]).clamp(true);
    var s = offsetScale(offsetLength) || 30;

    var l = Math.sqrt((Xd - Xs) * (Xd - Xs) + (Yd - Ys) * (Yd - Ys));
    var sin = (Yd - Ys) / l;
    var cos = (Xd - Xs) / l;

    return {
        Xs: Xs + s * cos || Xs,
        Ys: Ys + s * sin || Ys,
        Xd: Xd - s * cos || Xd,
        Yd: Yd - s * sin || Yd
    }
}