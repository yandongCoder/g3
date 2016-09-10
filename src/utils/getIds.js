export default function (array) {
    return array.map(function(item){
        if(typeof item  ===  'object') return item.id;
        else return item;
    });
}