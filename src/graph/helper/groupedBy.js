export default function GroupedBy(newNode, Nodes, Links, attachedLinks) {
    this.nodes = Nodes;
    this.links = Links;
    this.attachedLinks = [];
    
    Nodes.forEach(function(Node){ Node.grouped(true); });
    Links.forEach(function(Link){ Link.grouped(true); });
    
    attachedLinks.forEach(function(Link){
        var attachedLink = {"link": Link};
        if(Nodes.indexOf(Link.source) !== -1) {
            attachedLink.originalSource = Link.source;
            Link.source = newNode;
        }
        if(Nodes.indexOf(Link.target) !== -1) {
            attachedLink.originalTarget = Link.target;
            Link.target = newNode;
        }
        this.attachedLinks.push(attachedLink);
    }, this);
    
}

GroupedBy.prototype = {
    constructor: GroupedBy,
    ungroup: ungroup,
    pickIds: pickIds,
    remove: remove
};

function ungroup(){
    this.nodes.forEach(function(Node){
        Node.grouped(false);
    });
    this.links.forEach(function(Link){
        Link.grouped(false);
    });
    this.attachedLinks.forEach(function(attachedLink){
        if(attachedLink.originalSource) attachedLink.link.source = attachedLink.originalSource;
        else attachedLink.link.target = attachedLink.originalTarget;
    });
}
function pickIds(){
    var onlyId = {nodes: [], links: [], attachedLinks: []};
    this.nodes.forEach(function(Node){onlyId.nodes.push(Node.id);});
    this.links.forEach(function(Link){onlyId.links.push(Link.id);});
    this.attachedLinks.forEach(function(obj){
        var attachedLink = {link: obj.link.id};
        if(obj.originalSource) attachedLink.originalSource = obj.originalSource.id;
        if(obj.originalTarget) attachedLink.originalTarget = obj.originalTarget.id;
        onlyId.attachedLinks.push(attachedLink);
    });
    return onlyId;
}

function remove(){
    this.nodes.forEach(function(Node){Node.remove();});
    this.links.forEach(function(Node){Node.remove();});
    this.attachedLinks.forEach(function(obj){obj.link.remove();});
}