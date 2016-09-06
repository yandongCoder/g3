//中文为2长度，非中文为1

export default function (str) {
    var len = 0;
    if (typeof str !== "string") {
        return len;
    }
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) > '~') {
            len += 2;
        } else {
            len++;
        }
    }
    return len;
};