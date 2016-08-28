export default function (width) {
    if(!arguments.length) {
        console.log('get width');
    }
    console.log('set width: ' + width);

    return this;
}