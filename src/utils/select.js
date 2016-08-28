export default function (selector) {
    return typeof selector === "string"? document.querySelector(selector): selector;
}