export default function (parent){
    let str = "<defs></defs>";
    [1,2,3].map(n => n + 1);

    parent.insertAdjacentHTML("afterbegin", str);
}