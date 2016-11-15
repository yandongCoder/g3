export default function (grouped) {
    var connectedLinks = this.graph._links.filter(function (Link) {
        return  ((Link.source === this) || (Link.target === this)) && !Link.merged() && (Link.transformed() === this.transformed());
    }, this);
    
    if(grouped){
        var separated = {};

        connectedLinks.forEach(function(Link){
            var separatedId = Link.source.id === this.id? Link.target.id: Link.source.id;
            if(separated[separatedId] === undefined) separated[separatedId] = [];
            separated[separatedId].push(Link);
        },this);

        connectedLinks = [];
        for (var k in separated){
            connectedLinks.push(separated[k]);
        }
    }

    return connectedLinks;
}
