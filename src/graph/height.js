export default function (height) {
    if(!arguments.length) {
        console.log('get height');
    }
    console.log('set height: ' + height);

    return this;
}