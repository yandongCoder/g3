export default function (Xs, Ys, Xd, Yd, offsetS, offsetD) {
    var l = Math.sqrt((Xd - Xs) * (Xd - Xs) + (Yd - Ys) * (Yd - Ys));
    var sin = (Yd - Ys) / l;
    var cos = (Xd - Xs) / l;

    return {
        Xs: Xs + offsetS * cos || Xs,
        Ys: Ys + offsetS * sin || Ys,
        Xd: Xd - offsetD * cos || Xd,
        Yd: Yd - offsetD * sin || Yd
    }
}