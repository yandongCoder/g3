export default function () {
    this.getHomoLinks().forEach(function(Link){
       Link.unmerge();
    });

    this.merge();
}