export default function () {
    return this.getLinks(function(Link){
       return !Link._transformed;
    });
}