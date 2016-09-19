export default function (url) {
    return (url || window.location.href).split('#')[0];
}