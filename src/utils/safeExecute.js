export default function (maybeFunction) {
    return (maybeFunction instanceof Function)? maybeFunction(): maybeFunction;
}