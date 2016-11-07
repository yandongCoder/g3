export default function (filter, iteratee) {
    var Nodes = this.getUngroupedNodes(filter);
    if(Nodes.length <= 1) return;
    
    var groupedNodes = _.chain(Nodes)
        .groupBy(iteratee)
        .toArray()
        .value();
    
    groupedNodes.forEach(function(item){
        this.group(item);
    }, this);
}
