export default function (Sx, Sy, Tx, Ty, offsetS, offsetT) {
    var l = Math.sqrt((Tx - Sx) * (Tx - Sx) + (Ty - Sy) * (Ty - Sy));
    var sin = (Ty - Sy) / l;
    var cos = (Tx - Sx) / l;

    return {
        Sx: Sx + offsetS * cos || Sx,
        Sy: Sy + offsetS * sin || Sy,
        Tx: Tx - offsetT * cos || Tx,
        Ty: Ty - offsetT * sin || Ty
    }
}