export default function () {
    return this.getLinks(function(Link){
       return !Link.transformed() && !Link._merged;
    });
}