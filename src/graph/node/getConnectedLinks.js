export default function (grouped) {
    var connectedLinks = this.graph._links.filter(function (Link) {
        return  ((Link.source === this) || (Link.target === this)) && !Link.merged();
    }, this);
    
    if(grouped){
        var separated = {};

        connectedLinks.forEach(function(Link){
            var separatedId = Link.src === this.id? Link.dst: Link.src;
            if(separated[separatedId] === undefined) separated[separatedId] = [];
            separated[separatedId].push(Link);
        },this);

        var connectedLinks = [];
        for (var k in separated){
            connectedLinks.push(separated[k]);
        }
    }

    return connectedLinks;
}
