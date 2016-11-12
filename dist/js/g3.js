//g3
(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
   typeof define === 'function' && define.amd ? define(['exports'], factory) :
   (factory((global.g3 = global.g3 || {})));
}(this, (function (exports) { 'use strict';

function select (selector) {
    return typeof selector === "string"? document.querySelector(selector): selector;
}

const DIRECTION = {
    NONE: 0,
    S2D: 1,
    D2S: 2,
    DOUBLE: 3
};

const LINK_REMOVE_TYPE = {
    UNMERGE: 1,
    L2N: 2
};
const REMOVE_TYPE = {
    UNGROUP: 1
};

const BUILD_REF_TYPE = {
    NODE: 1,
    LINK: 2
};

const RENDER_TYPE = {
    FORCEDRAW: "forceDraw",
    TRANSFORM: 1,
    NUDGE: 2,
    ZOOM: 3
};

function render (callback, renderType) {
    if(!this.config.ifRender) return this;

    var canvasType = this._canvas.nodeName;

    if(canvasType === 'svg'){
        this._init();
    }

    var self = this;
    clearTimeout(this._renderDelay);
    
    if(renderType === RENDER_TYPE.ZOOM) draw();
    else this._renderDelay = setTimeout(draw, 0);
    
    return this;
    
    function draw(){
        self._draw(renderType, canvasType);
        if(callback instanceof Function) callback();
    }
}

function toArray (maybeArr) {
    if(!Array.isArray(maybeArr)) maybeArr = [maybeArr];
    return maybeArr;
}

function nodes (nodes, cover) {
    nodes = toArray(nodes);

    if(!arguments.length){
        return this._nodes;
    }

    if(cover){
        this.clearNodes();
    }

    nodes.forEach(function(v){
        this._addNode(v);
    },this);

    this.buildReference(BUILD_REF_TYPE.NODE);
    //this._preTransfer();

    this.render();
    
    return this;
}

function getIds (array) {
    return array.map(function(item){
        if(typeof item  ===  'object') return item.id;
        else return item;
    });
}

//filter array of object which has id; filtered by id, or id array, or object that has id, or object array
//this function is convenient to Nodes or Links data.
function filterBy (filter, objArray) {
    if(typeof filter === "function"){
        var filtered = filter;
    }else if(filter === undefined || filter === null){
        filtered = function(){return true};
    }else{
        var ids = getIds(toArray(filter));

        filtered = function(v){
            return ids.indexOf(v.id) !== -1;
        };
    }
    return objArray.filter(filtered);
}

function getNodes (filter) {
    return filterBy(filter, this._nodes);
}

function getSelectedNodes () {
    return this.getNodes(function(Node){
        return Node.selected();
    });
}

function getRenderedNodes () {
    return this.getNodes(function(Node){
        return !Node.transformed() && !Node.grouped();
    });
}

function getUngroupedNodes (filter) {
    return this.getNodes(filter)
        .filter(function(Node){ return !Node.grouped() });
}

//中文为2长度，非中文为1

function getStrLen (str) {
    var len = 0;
    if (typeof str !== "string") {
        str = str.toString();
    }
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) > '~') {
            len += 2;
        } else {
            len++;
        }
    }
    return len;
};

function selected (selected) {
    if(!arguments.length) return this._selected;
    this._selected = selected;

    this.graph.render();

    return this;
}

function transformed (transformed) {
    if(!arguments.length) return this._transformed || false;

    this._transformed = transformed;
    
    return this;
}

function nudge (nudgeX, nudgeY) {
    if(!this.graph.config.dragable) return;
    
    this.x += nudgeX;
    this.y += nudgeY;

    this.graph.render();

    return this;
}

function color (color) {
    if(!arguments.length) return this._color || "#123456";

    this._color = color;
    this.graph.render();

    return this;
}

function radius (radius) {
    if(!arguments.length) return this._radius;

    this._radius = radius;
    this.graph.render();

    return this;
}

function label (label) {
    if(!arguments.length) return this._label || "";

    this._label = label;
    this.graph.render();

    return this;
}

function getX() {
    return this.x;
}

function getY() {
    return this.y;
}

//Link has source and target Node in _nodes
function hasST () {
    return (this.source !== undefined) && (this.target !== undefined);
}

function getOffsetCoordinate (Sx, Sy, Tx, Ty, offsetS, offsetT) {
    var l = Math.sqrt((Tx - Sx) * (Tx - Sx) + (Ty - Sy) * (Ty - Sy));
    if(l === 0) l = 1;

    var sin = (Ty - Sy) / l;
    var cos = (Tx - Sx) / l;
    
    return {
        Sx: Sx + offsetS * cos,
        Sy: Sy + offsetS * sin,
        Tx: Tx - offsetT * cos,
        Ty: Ty - offsetT * sin
    }
}

//Link coordination is Node center's coordination or coordination where arrow placed, if any.
function getCoordination (forText) {

    var sourceOffset = this.source.radius();
    var targetOffset = this.target.radius();
    var arrowLength = this.width() * 3;

    var Sx = this.source.getX(),
        Sy = this.source.getY(),
        Tx = this.target.getX(),
        Ty = this.target.getY();


    if(this.hasSourceArrow()) sourceOffset += arrowLength;
    if(this.hasTargetArrow()) targetOffset += arrowLength;

    var offset = getOffsetCoordinate(Sx, Sy, Tx, Ty, sourceOffset, targetOffset);

    if(this.hasSourceArrow()){
        Sx = offset.Sx;
        Sy = offset.Sy;
    }
    if(this.hasTargetArrow()){
        Tx = offset.Tx;
        Ty = offset.Ty;
    }

    if(forText){
        Sx = offset.Sx;
        Sy = offset.Sy;
        Tx = offset.Tx;
        Ty = offset.Ty;
    }

    return {
        Sx: Sx,
        Sy: Sy,
        Tx: Tx,
        Ty: Ty
    };
}

function getStartArrow () {
    if(this.direction() === DIRECTION.D2S || this.direction() === DIRECTION.DOUBLE)
        return "url(" + window.location.href.split('#')[0] + "#start-arrow)";
    else
        return "";
}

function getEndArrow () {
    if(this.direction() === DIRECTION.S2D || this.direction() === DIRECTION.DOUBLE)
        return "url(" + window.location.href.split('#')[0] + "#end-arrow)";
    else
        return "";
}

function getTextOffset () {
    var self = this;
    var coord = this.getCoordination(true);

    var x = Math.abs(coord.Tx - coord.Sx);
    var y = Math.abs(coord.Ty - coord.Sy);
    var z = Math.sqrt(x * x + y * y);

    var charLength = getStrLen(this.label()) * 6.6 / 2;

    var dx = z / 2 - charLength;
    
    return dx + textLeftOffset();

    function textLeftOffset(){
        if((self.hasTargetArrow() && !self.hasSourceArrow()) || (!self.hasTargetArrow() && !self.hasSourceArrow())) return self.source.radius();
        //else if(!self.hasTargetArrow() && self.hasSourceArrow()) return self.target.radius();
        else return 0;
    }
}

function getLinkLabelTransform (scaleFactor) {
    var coord = this.getCoordination(true);
    var rx = (coord.Sx + coord.Tx) / 2;
    var ry = (coord.Sy + coord.Ty) / 2;


    if (coord.Tx < coord.Sx) {
        return 'rotate(180 ' + rx + ' ' + ry + ') translate(' + rx + ' ' + ry + ') scale(' + 1 / scaleFactor + ') translate(' + -rx + ' ' + -ry + ')';
        //先移动原点到字体位置，然后进行缩放，在将原点移回到初始位置
    } else {
        return 'translate(' + rx + ' ' + ry + ') scale(' + 1 / scaleFactor + ') translate(' + -rx + ' ' + -ry + ')';
    }
}

function transformed$1 (transformed) {
    if(!arguments.length) return this._transformed || false;

    this._transformed = transformed;

    return this;
}

function label$1 (label) {
    if(!arguments.length) return this._label;

    this._label = label;
    this.graph.render();

    return this;
}

function width (width) {
    if(!arguments.length) return this._width;

    this._width = width;
    this.graph.render();

    return this;
}

function color$1 (color) {
    if(!arguments.length) return this._color;

    this._color = color;
    this.graph.render();

    return this;
}

function direction (direction) {
    if(!arguments.length) return this._direction;

    this._direction = direction;
    this.graph.render();

    return this;
}

function remove (type) {
    delete this.graph._linksHash[this.id];
    this.graph._links.splice(this.graph._links.indexOf(this), 1);

    this.graph.render();
    
    if(this.mergedBy && (type !== LINK_REMOVE_TYPE.UNMERGE) ) this.mergedBy.remove();
    if(this.transformedBy && (type !== LINK_REMOVE_TYPE.L2N)) this.transformedBy.remove();

    return this;
}

function merged (merged) {
    if(!arguments.length) return this._merged === undefined? false : this._merged;

    this._merged = merged;
    
    return this;
}

// Real Life Color Mixer by Camilo Tapia (github.com/Camme)
// Emulate color mixing as if you where mixing real life colors, ie substractive colors
//
// Usage:
//
// RLColorMixer.mixColorS(arrayOfColors);
// where arrayOFColos is an array of hex rgb colors ['#ff0000', '#00ff00'] or an array with the amoutn of each color
// [{color: '#ff0000', parts: 10}, {color: '#00ff00', parts: 2}].
// or a mizture of the two.
//
// You can also snap to the nearest color in an array of hex rgb colors:
// RLColorMixer.findNearest(orgColorinHex, listOfColors);
//
// Example:
// RLColorMixer.findNearest('#fff000', ['#ff0000', '#ff0f00']);
//

var defaults = { result: "ryb", hex: true };

function mix() {


    var options = JSON.parse(JSON.stringify(defaults));

    // check if the last arguments is an options object
    var lastObject = arguments[arguments.length - 1];
    if (typeof lastObject == "object" && lastObject.constructor != Array) {
        var customOptions = lastObject;
        options.result = customOptions.result || options.result;
        options.hex = typeof customOptions.hex != "undefined" ? customOptions.hex : options.hex;
        arguments.length--;
    }

    var colors = [];

    // check if we got an array, but not if the array is just a representation of hex
    if (arguments[0].constructor == Array && typeof arguments[0][0] != "number") {
        colors = arguments[0];
    } else {
        colors = arguments;
    }

    //normalize, ie make sure all colors are in the same format
    var normalized = [];
    for(var i = 0, ii = colors.length; i < ii; i++){
        var color = colors[i];
        if (typeof color == "string") {
            color = hexToArray(color);
        }
        normalized.push(color);
    }

    var newColor = mixRYB(normalized);

    if (options.result == "rgb") {
        newColor = rybToRgb(newColor);
    }

    if (options.hex) {
        newColor = arrayToHex(newColor);
    }

    return newColor;

}

function mixRYB(colors) {

    var newR = 0;
    var newY = 0;
    var newB = 0;

    var total = 0;

    var maxR = 0;
    var maxY = 0;
    var maxB = 0;

    for(var i = 0, ii = colors.length; i < ii; i++){

        var color = colors[i];

        newR += color[0];
        newY += color[1];
        newB += color[2];

    }

    // Calculate the max of all sums for each color
    var max = Math.max(newR, newY, newB);

    // Now calculate each channel as a percentage of the max
    var totalR = Math.floor(newR / max * 255);
    var totalY = Math.floor(newY / max * 255);
    var totalB = Math.floor(newB / max * 255);

    return [totalR, totalY, totalB];

}

function hexToArray(hex) {
    var hex = hex.replace("#", '');
    var r = parseInt(hex.substr(0, 2), 16);
    var g = parseInt(hex.substr(2, 2), 16);
    var b = parseInt(hex.substr(4, 2), 16);
    return [r, g, b];
}


function arrayToHex(rgbArray) {
    var rHex = Math.round(rgbArray[0]).toString(16); rHex = rHex.length == 1 ? "0" + rHex : rHex;
    var gHex = Math.round(rgbArray[1]).toString(16); gHex = gHex.length == 1 ? "0" + gHex : gHex;
    var bHex = Math.round(rgbArray[2]).toString(16); bHex = bHex.length == 1 ? "0" + bHex : bHex;
    return rHex + gHex + bHex;;
}

function cubicInt(t, A, B){
    var weight = t*t*(3-2*t);
    return A + weight*(B-A);
}

function getR(iR, iY, iB) {
    // red
    var x0 = cubicInt(iB, 1.0, 0.163);
    var x1 = cubicInt(iB, 1.0, 0.0);
    var x2 = cubicInt(iB, 1.0, 0.5);
    var x3 = cubicInt(iB, 1.0, 0.2);
    var y0 = cubicInt(iY, x0, x1);
    var y1 = cubicInt(iY, x2, x3);
    return Math.ceil (255 * cubicInt(iR, y0, y1));
}

function getG(iR, iY, iB) {
    // green
    var x0 = cubicInt(iB, 1.0, 0.373);
    var x1 = cubicInt(iB, 1.0, 0.66);
    var x2 = cubicInt(iB, 0.0, 0.0);
    var x3 = cubicInt(iB, 0.5, 0.094);
    var y0 = cubicInt(iY, x0, x1);
    var y1 = cubicInt(iY, x2, x3);
    return Math.ceil (255 * cubicInt(iR, y0, y1));
}

function getB(iR, iY, iB) {
    // blue
    var x0 = cubicInt(iB, 1.0, 0.6);
    var x1 = cubicInt(iB, 0.0, 0.2);
    var x2 = cubicInt(iB, 0.0, 0.5);
    var x3 = cubicInt(iB, 0.0, 0.0);
    var y0 = cubicInt(iY, x0, x1);
    var y1 = cubicInt(iY, x2, x3);
    return Math.ceil (255 * cubicInt(iR, y0, y1));
}

function rybToRgb(color, options){

    if (typeof color == "string") {
        color = hexToArray(color);
    }

    var R = color[0] / 255;
    var Y = color[1] / 255;
    var B = color[2] / 255;
    var R1 = getR(R,Y,B) ;
    var G1 = getG(R,Y,B) ;
    var B1 = getB(R,Y,B) ;
    var ret = [ R1, G1, B1 ];

    if (options && options.hex == true) {
        ret = arrayToHex(ret);
    }

    return ret;
}

//  colorMixer.mix = mix;
//  colorMixer.rybToRgb = rybToRgb;
//  colorMixer.findNearest = findNearest;

var colorMixer = {
    mix: mix
};

function concat(key, objArray){
    return objArray.map(function(obj){
        return obj[key] instanceof Function ? obj[key]() : obj[key];
    }).join("&");
}

function average(key, objArray){
    return objArray.reduce(function(p, obj){
            return p + (obj[key] instanceof Function ? obj[key]() : obj[key]);
        }, 0) / objArray.length;
}

function direction$1(Links){
    return Links.reduce(function(p, Link){
        if(p === DIRECTION.NONE) return Link.direction();
        if(Link.direction() === DIRECTION.NONE) return p;
        if(p === DIRECTION.DOUBLE || Link.direction() === DIRECTION.DOUBLE) return DIRECTION.DOUBLE;
        if((p === DIRECTION.S2D && Link.direction() === DIRECTION.D2S) || (p === DIRECTION.D2S && Link.direction() === DIRECTION.S2D)) return DIRECTION.DOUBLE;
        if(p === Link.direction()) return p;
    }, DIRECTION.NONE);
}

function deriveLinkFromLinks (Links) {

    var obj = {};
    obj.id = "merged:" + concat("id", Links);
    obj.label = concat("label", Links);
    obj.width = average('width', Links);
    obj.src = Links[0].src;
    obj.dst = Links[0].dst;
    obj.color = "#"+  colorMixer.mix(Links.map(function(Link){return Link.color()}));
    obj.direction = direction$1(Links);


    
    return obj;
}

function MergedBy(Links) {
    Links.forEach(function(Link){
        Link.merged(true);
    });
    
    this.links = Links;
}

MergedBy.prototype = {
    constructor: MergedBy,
    remove: remove$1,
    unmerge: unmerge
};

function remove$1 (){
    this.links.forEach(function(Link){Link.remove();});
}

function unmerge (){
    this.links.forEach(function(Link){
        Link.merged(false);
        Link.NtoL();
    });
}

function merge () {
    //每个Link本身只能被合并一次，也意味着只能存在于唯一一个Link的mergedBy属性中，for idempotent, 幂等性
    var toMergedLinks = this.getHomoLinks().filter(function(Link){ return !Link.merged() && !Link.grouped()});

    if(toMergedLinks.length <= 1) return;
    
    var linkObj = deriveLinkFromLinks(toMergedLinks);
    linkObj.mergedBy = new MergedBy(toMergedLinks);

    var Link = this.graph._addLink(linkObj);

    Link.NtoL();

    this.graph.render();

    return this;
}

function flattenMerge () {
    this.getHomoLinks().forEach(function(Link){
       Link.unmerge();
    });

    this.merge();
}

function unmerge$1 () {
    if(!this.mergedBy) return;

    this.remove(LINK_REMOVE_TYPE.UNMERGE);

    this.mergedBy.unmerge();
    
    return this;
}

function getHomoLinks () {
    return this.graph._links.filter(function(Link){
        return (Link.source === this.source || Link.source === this.target) &&
                (Link.target === this.source || Link.target === this.target);
    }, this) || [];
}

function LtoN () {
    if(!this.transformedBy) return;
    
    this.transformedBy.untransform();

    this.remove(LINK_REMOVE_TYPE.L2N);

    return this;
}

function NtoL$1 () {
    if(!this.transformed() && this.source.transformed()) this.source.NtoL();
    if(!this.transformed() && this.target.transformed()) this.target.NtoL();
}

function grouped (grouped) {
    if(!arguments.length) return this._grouped === undefined? false : this._grouped;

    this._grouped = grouped;

    return this;
}

function getJSON () {
    var exceptArr = ['_element', '_needMerged', '_needTransformed', 'graph', 'source', 'target'];
    var json = {};
    for (var prop in this) {
        if (prop === 'mergedBy') {
            json[prop] = {links: []};
            this[prop].links.map(function(Link){ json[prop].links.push(Link.id);});
            
        } else if(prop === 'transformedBy'){
            json[prop] = {node: this[prop].node.id, links: []};
            this[prop].links.map(function(Link){ json[prop].links.push(Link.id);});
            
        } else if (this.hasOwnProperty(prop) && (exceptArr.indexOf(prop) === -1)) {
            var jsonProp = prop.replace(/_/, "");
            json[jsonProp] = this[prop];
        }
    }
    
    return json;
}

function selected$1 (selected) {
    if(!arguments.length) return this._selected;
    this._selected = selected;
    
    this.graph.render();
    
    return this;
}

function Link(data, graph) {
    this.graph = graph;
    this.id = data.id;
    this._label = data.label || "";
    this._width = data.width || (graph && graph.config.linkWidth);
    this._color = data.color || "#a1a1a1";
    this._selected = data.selected || false;
    this.src = data.src;
    this.dst = data.dst;
    this._direction = data.direction === undefined? 1: data.direction;//0: none, 1: from, 2: to, 3 double

    this.source = graph && this.graph._nodesHash[this.src];
    this.target = graph && this.graph._nodesHash[this.dst];
    
    if(data.grouped) this._grouped = data.grouped;
    if(data.merged) this._merged = data.merged;
    //this._needMerged = data.merged || false;

    if(data.mergedBy) this.mergedBy = data.mergedBy;
    if(data.transformedBy) this.transformedBy = data.transformedBy;
    
    for (var prop in data) {
        if (data.hasOwnProperty(prop) && this[prop] === undefined) this[prop] = data[prop];
    }
}


Link.prototype = {
    constructor: Link,
    hasST: hasST,
    transformed: transformed$1,
    getCoordination: getCoordination,
    getStartArrow: getStartArrow,
    getEndArrow: getEndArrow,
    getTextOffset: getTextOffset,
    getLinkLabelTransform: getLinkLabelTransform,
    getJSON: getJSON,
    label: label$1,
    width: width,
    selected: selected$1,
    remove: remove,
    merged: merged,
    merge: merge,
    flattenMerge: flattenMerge,
    unmerge: unmerge$1,
    grouped: grouped,
    LtoN: LtoN,
    NtoL: NtoL$1,
    color: color$1,
    direction: direction,
    getHomoLinks: getHomoLinks,
    hasSourceArrow: function(){
        return this.direction() === DIRECTION.D2S || this.direction() === DIRECTION.DOUBLE;
    },
    hasTargetArrow: function(){
        return this.direction() === DIRECTION.S2D || this.direction() === DIRECTION.DOUBLE;
    }
};

function deriveLinkFromLNL (srcLinks, Node, dstLinks) {
    srcLinks = srcLinks.length > 1? new Link(deriveLinkFromLinks(srcLinks)): srcLinks[0];
    dstLinks = dstLinks.length > 1? new Link(deriveLinkFromLinks(dstLinks)): dstLinks[0];

    var obj = {};
    obj.id = "transformed:(" + srcLinks.id + ")" + Node.id + "(" + dstLinks.id + ")";
    obj.label = "(" + srcLinks.label() + ")" + Node.label() + "(" + dstLinks.label() + ")";
    obj.src = srcLinks.src === Node.id? srcLinks.dst: srcLinks.src;
    obj.dst = dstLinks.src === Node.id? dstLinks.dst: dstLinks.src;
    obj.width = (srcLinks.width() + dstLinks.width()) / 2;
    obj.color = Node.color();
    obj.direction = direction$1([srcLinks, dstLinks]);

    return obj;
}

function TransformedBy (Node, Links){
    this.node = Node;
    this.links = Links;
    
    Node.transformed(true);
    Links.forEach(function(Link){Link.transformed(true);});
}

TransformedBy.prototype = {
    constructor: TransformedBy,
    untransform: untransform,
    remove: remove$2
};

function remove$2 (){
    this.node.remove();
    this.links.forEach(function(Link){Link.remove();});
}

function untransform (){
    this.node.transformed(false);
    this.links.forEach(function(Link){ Link.transformed(false);});
}

function NtoL () {
    if(this.transformedTo) this.transformedTo.LtoN();//transform a Node that has been transformed before, transform back first.

    var contractedLinks = this.getConnectedLinks(true);

    if(contractedLinks.length !== 2) return;
    
    var newLink = deriveLinkFromLNL(contractedLinks[0], this, contractedLinks[1]);

    newLink.transformedBy = new TransformedBy(this, contractedLinks[0].concat(contractedLinks[1]));

   this.transformedTo = this.graph._addLink(newLink);

    this.graph.render();
}

function getConnectedLinks (grouped) {
    var connectedLinks = this.graph._links.filter(function (Link) {
        return  ((Link.source === this) || (Link.target === this)) && !Link.merged() && (Link.transformed() === this.transformed());
    }, this);
    
    if(grouped){
        var separated = {};

        connectedLinks.forEach(function(Link){
            var separatedId = Link.src === this.id? Link.dst: Link.src;
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

function remove$3 (removeType) {
    delete this.graph._nodesHash[this.id];
    this.graph._nodes.splice(this.graph._nodes.indexOf(this), 1);
    
    if(this.groupedBy && (removeType !== REMOVE_TYPE.UNGROUP) ) this.groupedBy.remove();
}

function grouped$1 (grouped) {
    if(!arguments.length) return this._grouped === undefined? false : this._grouped;

    this._grouped = grouped;

    return this;
}

function ungroup () {
    if(!this.groupedBy || this.grouped()) return;
    
    this.groupedBy.ungroup();

    this.remove(REMOVE_TYPE.UNGROUP);

    this.graph.render();
    return this;
}

function getJSON$1 () {
    var exceptArr = ['_element', '_needTransformed', 'graph'];
    var json = {};
    for (var prop in this) {
        if (prop === 'groupedBy') {
            json[prop] = this[prop].pickIds();
    
        } else if (this.hasOwnProperty(prop) && (exceptArr.indexOf(prop) === -1)) {
            var jsonProp = prop.replace(/_/, "");
            json[jsonProp] = this[prop];
        }
    }
    
    return json;
}

//data: data obj, graph: graphInstance
function Node(data, graph) {
    this.graph = graph;
    this.id = data.id;
    this._label = data.label || "";
    this.x = data.x || 0;
    this.y = data.y || 0;
    this._radius = data.radius || graph.config.radius;
    this._color = data.color || graph.config.color;
    this._selected = data.selected || false; //indicate whether node is select
    if(data.grouped) this._grouped = data.grouped;
    
    //this._needTransformed = data.transformed || false;
    
    for (var prop in data) {
        if (data.hasOwnProperty(prop) && this[prop] === undefined) this[prop] = data[prop];
    }
}


Node.prototype = {
    constructor: Node,
    selected: selected,
    transformed: transformed,
    nudge: nudge,
    getX: getX,
    getY: getY,
    label: label,
    getLabelWidth: function(){
        return getStrLen(this.label()) * 9;
    },
    color: color,
    radius: radius,
    remove: remove$3,
    NtoL: NtoL,
    getConnectedLinks: getConnectedLinks,
    grouped: grouped$1,
    ungroup: ungroup,
    getJSON: getJSON$1
};

function addNode (obj) {
    var node = new Node(obj, this);
    if(!this.hasNode(node)){
        this._nodesHash[node.id] = node;
        this._nodes.push(node);
    }
    return node;
}

function hasNode (obj) {
    return this._nodesHash[obj.id]? true: false;
}

//nodes could be: Node, [Node], Node id string, Node id array of string
function removeNodes (nodes) {
    this.getNodes(nodes).forEach(function(Node){
        //remove links first
        this._removeLinksOfNode(Node);
        Node.remove();
    }, this);

    this.render();

}

function clearNodes () {
    this._nodes = [];
}

function selectNodes (filter, retainOther) {
    if(!retainOther) this.unselectNodes();
    this.getNodes(filter).forEach(function(Node){
        Node.selected(true);
    }, this);

    this.render();
}

function unselectNodes (filter) {
    this.getNodes(filter).forEach(function(Node){
        Node.selected(false, true);
        this.render();
    }, this);
}

function getInvertedNodes (filter) {
    var Nodes = this.getNodes(filter);
    return this.getRenderedNodes().filter(function(Node){
        return Nodes.indexOf(Node) === -1;
    });
}

function getRelatedNodes (filter) {
    var Nodes = this.getNodes(filter);
    var argLength = Nodes.length;

    for (var i = 0; i < Nodes.length; i++) {
        var adjList = getAdjNode(Nodes[i], this);
        adjList.forEach(function (Node) {
            if (Nodes.indexOf(Node) === -1) {
                Nodes.push(Node);
            }
        });
    }

    //minus original Nodes
    Nodes = Nodes.filter(function(Node, i){
        return i >= argLength;
    });
    return Nodes;
}

function getAdjNode(Node, self) {
    var Nodes = [];
    self.getRenderedLinks().forEach(function (Link) {
        if (Link.source === Node && (Nodes.indexOf(Link.target) === -1)) {
            Nodes.push(Link.target);
        } else if (Link.target === Node && (Nodes.indexOf(Link.source) === -1)) {
            Nodes.push(Link.source);
        }
    });
    return Nodes;
}

function getLinkedNodes (filter, type) {
    var Nodes = this.getNodes(filter);

    var relatedNodes = [];

    this.getRenderedLinks().forEach(function (Link) {
        if(type === 'none' && Link.direction() !== DIRECTION.NONE) return;
        if(type === 'double' && Link.direction() !== DIRECTION.DOUBLE) return;
        if (Nodes.indexOf(Link.source) !== -1) {
            if(type === 'in' && Link.direction() !== DIRECTION.D2S) return;
            if(type === 'out' && Link.direction() !== DIRECTION.S2D) return;
            relatedNodes.push(Link.target);
        }
        if (Nodes.indexOf(Link.target) !== -1) {
            if(type === 'in' && Link.direction() !== DIRECTION.S2D) return;
            if(type === 'out' && Link.direction() !== DIRECTION.D2S) return;
                relatedNodes.push(Link.source);
        }
    });

    return relatedNodes;
}

function GroupedBy(newNode, Nodes, Links, attachedLinks) {
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
    ungroup: ungroup$1,
    pickIds: pickIds,
    remove: remove$4
};

function ungroup$1(){
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

function remove$4(){
    this.nodes.forEach(function(Node){Node.remove();});
    this.links.forEach(function(Node){Node.remove();});
    this.attachedLinks.forEach(function(obj){obj.link.remove();});
}

function buildReference (type) {
    this._links.forEach(function (Link) {
        if(Link.mergedBy && !(Link.mergedBy instanceof MergedBy) ){
            var Links = this.getLinks(Link.mergedBy.links);
            
            if(Links.length === Link.mergedBy.links.length) Link.mergedBy = new MergedBy(Links);
        }
        
        if(Link.transformedBy && !(Link.transformedBy instanceof TransformedBy) ){
            var Node = this.getNodes(Link.transformedBy.node)[0];
                Links = this.getLinks(Link.transformedBy.links);
            
            if(Node && Links.length === Link.transformedBy.links.length) Link.transformedBy = new TransformedBy(Node, Links);
        }
    }, this);
    
    this._nodes.forEach(function (Node) {
        if(Node.groupedBy && (!(this.groupedBy instanceof GroupedBy)) ){
            var by = Node.groupedBy;
            var Nodes = this.getNodes(by.nodes);
            var Links = this.getLinks(by.links);
            var attachedLinks = this.getLinks(by.attachedLinks);
            
            if(Nodes.length === by.nodes.length && Links.length === by.links.length && attachedLinks.length === by.attachedLinks.length)
                Node.groupedBy = new GroupedBy(Node, Nodes, Links, attachedLinks);
            
        }
            
    }, this);
}

function links (links, cover) {
    links = toArray(links);

    if(!arguments.length){
        return this._links;
    }

    if(cover){
        this.clearLinks();
    }

    links.forEach(function(v){
        this._addLink(v);
    },this);

    this.buildReference(BUILD_REF_TYPE.LINK);
    //this._preTransfer();
    
    this.render();
    
    return this;
}

function getLinks (filter) {
    return filterBy(filter, this._links);
}

function getRenderedLinks () {
    return this.getLinks(function(Link){
       return !Link.transformed() && !Link.merged() && !Link.grouped();
    });
}

function addLink (obj) {
    var link = new Link(obj, this);
    if(!this.hasLink(link) && link.hasST()){
        this._linksHash[link.id] = link;
        this._links.push(link);
    }

    return link;
}

function hasLink (obj) {
    return this._linksHash[obj.id]? true: false;
}

//links could be: Link, [Link], Link id string, Link id array of string
function removeLinks (links) {
    this.getLinks(links).forEach(function(Link){
        Link.remove();
    }, this);

    this.render();
}

function removeLinksOfNode (Node) {
    Node.getConnectedLinks().map(function (Link) {
        Link.remove();
    }, this);
}

function clearLinks () {
    this._links = [];
}

function appendPreDefs () {
    var str = '<defs>'+
                        '<filter id="shadow" x="-20%" y="-20%" width="200%" height="200%" type="Shadow" shadowoffsetx="5" shadowoffsety="5" shadowblur="5" shadowcolor="rgba(0,0,0)">' +
                            '<feOffset result="offOut" in="SourceGraphic" dx="0" dy="3"></feOffset>' +
                            '<feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"></feColorMatrix>' +
                            '<feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>' +
                            '<feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>' +
                        '</filter>' +
                        '<marker id="start-arrow" viewBox="0 -5 10 10" refX="10" markerWidth="3" markerHeight="3" orient="auto"><path d="M10,-5L0,0L10,5"></path></marker>' +
                        '<marker id="end-arrow" viewBox="0 -5 10 10" refX="0" markerWidth="3" markerHeight="3" orient="auto"><path d="M0,-5L10,0L0,5"></path></marker>' +
                        '<marker id="end-arrow-hover" viewBox="0 -5 10 10" refX="0" markerWidth="3" markerHeight="3" orient="auto"><path d="M0,-5L10,0L0,5"></path></marker>' +
                        '<marker id="end-arrow-selected" viewBox="0 -5 10 10" refX="0" markerWidth="3" markerHeight="3" orient="auto"><path d="M0,-5L10,0L0,5"></path></marker>' +
                        '<radialGradient id="linear" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">' +
                            '<stop offset="0%" style="stop-color:rgb(255，255,255);stop-opacity:0" />' +
                            '<stop offset="90%" style="stop-color:rgb(255,255,255);stop-opacity:1" />' +
                            '<stop offset="98%" style="stop-color:rgb(255,255,255);stop-opacity:1" />' +
                            '<stop offset="100%" style="stop-color:rgb(222，222, 222);stop-opacity:1" />' +
                        '</radialGradient>' +
                '</defs>';

    this._canvas.insertAdjacentHTML("afterbegin", str);
}

function appendPreElement () {
    var svg = this._getSvgSelection();
    this._brushSelection = svg.append("g").attr("class", "brush");

    var forceGroup = this._forceGroupSelection = svg.append('g').attr('class', 'force');
    
    forceGroup.append("g").attr("class", "paths");
    forceGroup.append("g").attr("class", "link-labels");
    forceGroup.append("g").attr("class", "nodes");
}

function Zoom() {
    return d3.zoom().scaleExtent([0.1, 2.2])
        .on('start', function () {
        })
        .on("zoom", this._zoomed.bind(this))
        .on('end', function () {
        });
}

function Brush () {
    var self = this;
    var brush = d3.brush()
        .extent([[0, 0], [1500, 500]])
        .on('start', function () {
            if (!d3.event.selection) return; // Ignore empty selections.
            
            self._getNodesSelection().each(function (Node) {
                Node.pselected = d3.event.sourceEvent.ctrlKey && Node.selected();
            });
        })
        .on('brush', function () {
            if (!d3.event.selection) return; // Ignore empty selections.

            var extent = d3.event.selection;
            var t = self._getCurrentTransform();

            self._getNodesSelection().each(function(Node){
                Node.selected(Node.pselected ^ ( (extent[0][0] - t.x) / t.k  <= Node.getX() && Node.getX() < (extent[1][0] - t.x) / t.k  && (extent[0][1] - t.y) / t.k <= Node.getY() && Node.getY() < (extent[1][1] - t.y) / t.k ));
            });

        })
        .on('end', function () {
            if (!d3.event.selection) return; // Ignore empty selections.
            self._getBrushSelection()
                .call(brush.move, null);
        });

    brush.show = function(){
        self._getBrushSelection().style('display', 'block');
    };
    brush.hide = function(){
        self._getBrushSelection().style('display', 'none');
    };

    return brush;
}

function dragNode () {
    var self = this;
    var drag = d3.drag()
        .on("start", function (Node) {
            d3.event.sourceEvent.stopPropagation();
        })
        .on("drag", this.draged.bind(this))
        .on("end", function (Node) {

        });
    return drag;
}

function init () {
    //init trigger only once a graph
    if(this._hasInit) return;

    var self = this;

    //add predefined DOM
    appendPreElement.call(this);
    appendPreDefs.call(this);


    this._getSvgSelection()
        .classed("graph", true)
        .on('click', function(){
            if (d3.event.target.nodeName !== 'svg') return;

            //scope.cMenu.hide();
            self.unselectNodes();
        });

    //bind listener to page for keyboard shortCuts and mouse events
    d3.select(document.body)
        .on("keydown.brush", this._keydowned.bind(this))
        .on("keyup.brush", this._keyupped.bind(this));

    //add zoom instance to graph
    this.zoom = Zoom.call(this);
    this._getSvgSelection()
        .call(this.zoom);

    //add brush instance to graph
    this.brush = Brush.call(this);
    this._getBrushSelection()
        .call(this.brush);

    
    //new drag instance for bind to nodes
    this.dragNode = dragNode.call(this);

    this._hasInit = true;
}

function getAbsUrl (url) {
    return (url || window.location.href).split('#')[0];
}

function drawNodesSvg (drawType) {
    if(drawType === RENDER_TYPE.NUDGE){
        var selectedNodes = this._getSelectedNodesSelection();

        selectedNodes.attr("transform", function (Node) { return "translate(" + Node.getX() + "," + Node.getY() + ")";});
        return;
    }
    var self = this;
    var nodes = this._getNodesSelection().data(this.getRenderedNodes(), function (Node) { return Node.id;});

    var g = nodes.enter().append('g')
        .each(function(Node){ Node._element = this })//reference element to Node
        .classed('node', true)
        .on('mousedown', function(Node){
            if(!d3.event.ctrlKey){
                if(Node.selected()) return;
                self.unselectNodes();
            }
            Node.selected(!Node.selected());
        })
        .call(this.dragNode);

    //添加矩形
    g.append("circle")
        .attr("filter", "url(" + getAbsUrl() + "#shadow)");
    g.append('svg:foreignObject')
        .attr('class', 'text-group')
        .append("xhtml:div")
        .append('xhtml:span');

    //Enter and Update
    var all = this._getNodesSelection();

    all.attr("transform", function (Node) { return "translate(" + Node.getX() + "," + Node.getY() + ")";})
        .classed("selected", function(Node){return Node.selected()});

    all.select('circle')
        .attr("r", function(Node){ return Node.radius()})
        .style("fill", function(Node){ return Node.color() });
    
    
    var scale = self._getCurrentScale();
        
    all.select('.text-group')
        .attr('display', function(Node){
            return (scale < 0.8 && !Node.selected())? 'none': 'block';
        })
        .attr('width', function (Node) { return Node.getLabelWidth(); })
        .attr("height", function(Node){ return Node.radius() * scale; })
        .style("line-height", function(Node){ return Node.radius() * scale + "px"; })
        .attr("transform", function(Node){ return "translate(" + (1 + Node.radius()) + ", 0) scale(" + 1 / scale + ")"; })

        .select('div')
        .attr('title', function (Node) { return Node.label(); })
        .select('span')
        .text(function (Node) { return Node.label(); });

    nodes.exit().remove();

}

function drawLinksSvg (drawType) {
    var self = this;

    // if(drawType === DRAWTYPE.NUDGE){
    //     return;
    // }
    
    var links = this._getLinksSelection().data(this.getRenderedLinks(), function (Link) { return Link.id });

    links.enter()
        .append('path')
        .classed('link-path', true)
        .attr('id', function(Link){ return "link-path" + Link.id});

    var all  = this._getLinksSelection();

    all
        .attr('d', function (Link) { var c = Link.getCoordination();  return 'M ' + c.Sx + ' ' + c.Sy + ' L ' + c.Tx + ' ' + c.Ty; })
        .classed("selected", function(Link){return Link.selected()})
        .style('marker-start', function (Link) { return Link.getStartArrow(); })
        .style('marker-end', function (Link) { return Link.getEndArrow(); })
        .style('stroke-width', function(Link){ return Link.width(); })
        .style('stroke', function(Link){ return Link.color(); });


    links.exit().remove();
    

    //绑定linkData数据到linkLabels
    var linkLabels = this._getLinksLabelSelection().data(this._links, function (Link) { return Link.id; });

    //按需增加新的LinkLabels(当linksData data > linkPaths element)
    linkLabels.enter().append('text')
        .style("pointer-events", "none")
        .classed('link-label', true)
        .attr('id', function (Link) { return 'link-label' + Link.id; })
        //.attr('text-anchor', 'middle')
        .append('textPath')
        .attr('xlink:href', function (Link) {  return getAbsUrl() + '#link-path' + Link.id; })
        //.attr('startOffset', '50%')
        .style("pointer-events", "none");


    var allLabels = this._getLinksLabelSelection(),
        scale = self._getCurrentScale();

    allLabels
        .attr('display', function(Link){
            return (scale < 0.8 )? 'none': 'block';
        })
        .attr('dx', function(Link){return Link.getTextOffset(); })
        .attr('dy', 1)
        .attr('font-size', 13)
        //反转字体，使字体总是朝上，该句放于该函数最后执行，提前会导致问题
        .attr('transform', function(Link){ return Link.getLinkLabelTransform(scale); });

    allLabels.select('textPath')
        .text(function (Link) {
            return Link.label();
        });


    linkLabels.exit().remove();
}

function drawCanvas () {
    var context = this._canvas.getContext("2d");

    context.clearRect(0, 0, this._canvas.width, this._canvas.height);

    context.strokeStyle = "#ccc";
    context.beginPath();
    this.getRenderedLinks().forEach(function(Link) {
        context.moveTo(Link.source.getX(), Link.source.getY());
        context.lineTo(Link.target.getX(), Link.target.getY());
    });
    context.stroke();

    context.beginPath();
    this.getRenderedNodes().forEach(function(Node) {
        context.fillStyle = Node.color();
        context.moveTo(Node.getX(), Node.getY());
        context.arc(Node.getX(), Node.getY(), Node.radius(), 0, 2 * Math.PI);
    });
    context.fill();
}

function draw (drawType, canvasType) {
    if(canvasType === 'svg'){
        drawNodesSvg.call(this, drawType);
        drawLinksSvg.call(this, drawType);
    }else if(canvasType === 'CANVAS'){
        drawCanvas.call(this);
    }
}

function zoomed () {
    //不可移动
    if (!this.movable) {
        //将变换前的translate值赋给变换后的translate值,保持位置不变
        //this.zoom.translate(scope.config.status.translate);
    }
    //不可缩放
    if (!this.zoomable) {
        //this.zoom.scale(scope.config.status.scale);
    }
    //Graph._ifShowLabels();
    
    var previousScale = this._getForceGroup()._pScale;
    var currentScale = this._getCurrentScale().toFixed(4);
    //缩放网络图
    this._getForceGroup().attr("transform", "translate(" + d3.event.transform.x + ", "+ d3.event.transform.y + ") scale(" + currentScale + ")");
    this._getForceGroup()._pScale = currentScale;
    
    //panning don't need re-render, render only after zooming
    if(previousScale !== currentScale) this.render(null, RENDER_TYPE.ZOOM);
}

function transform (k, x, y, duration) {
    var transformed = d3.zoomIdentity;
    if(typeof k === "number") transformed = transformed.scale(k);
    if(typeof x === "number" && typeof y === "number") transformed = transformed.translate(x, y);
    this._getSvgSelection(duration).call(this.zoom.transform, transformed);
}

function scaleTo (k, duration) {
    this.transform(k, null, null, duration);
    return this;
}

function translateBy (x, y, duration) {
    this.transform(null, x, y , duration);
    return this;
}

function keydowned () {
    if (!d3.event.metaKey) {
        switch (d3.event.keyCode) {
            //shift alt and space is used by d3 brush
            case 90:
                this.brush.show();
                break;
        }
    }
}

function keyupped () {
    if (!d3.event.metaKey) {
        switch (d3.event.keyCode) {
            case 90:
                this.brush.hide();
                break;
        }
    }
}

function deriveNodeFromNodes (Nodes) {
    var obj = {};
    obj.id = "grouped:" + concat("id", Nodes);
    obj.label = concat("label", Nodes);
    obj.radius = average('radius', Nodes);
    obj.x = average('x', Nodes);
    obj.y = average('y', Nodes);
    obj.color = "#"+  colorMixer.mix(Nodes.map(function(Link){return Link.color()}));
    obj.selected = Nodes.every(function(Node){ return Node.selected()});

    return obj;
}

function group (filter) {
    var Nodes = this.getUngroupedNodes(filter);
    
    if(Nodes.length <= 1) return;

    var containLinks = this.getContainLinks(Nodes);
    var attachedLinks = this.getAttachedLinks(Nodes);
    var newNode = this._addNode(deriveNodeFromNodes(Nodes));
    
    
    
    newNode.groupedBy = new GroupedBy(newNode, Nodes, containLinks, attachedLinks);
    
    this.render();
}

function groupBy (filter, iteratee) {
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

function flattenGroup (filter) {
    var Nodes = this.getUngroupedNodes(filter);

    if(Nodes.length <= 1) return;

    var ungroupedNodes = [];
    
    Nodes.forEach(function(Node){
        ungroupNode(Node);
    });
    
    this.group(ungroupedNodes);
    
    
    function ungroupNode (Node){
        if(Node.groupedBy){
            Node.ungroup();
            Node.groupedBy.nodes.forEach(function(Node){
                ungroupNode(Node);
            });
        }else{
            ungroupedNodes.push(Node);
        }
    }
}

function getContainLinks (Nodes) {
    var ids = getIds(Nodes);
    return this._links.filter(function(Link){
        return (ids.indexOf(Link.source.id) !== -1) && (ids.indexOf(Link.target.id) !== -1) && !Link.merged();
    });
}

function getAttachedLinks (Nodes) {
    var ids = getIds(Nodes);
    return this._links.filter(function(Link){
        return ( (ids.indexOf(Link.source.id) === -1 && ids.indexOf(Link.target.id) !== -1) || (ids.indexOf(Link.source.id) !== -1 && ids.indexOf(Link.target.id) === -1) )
            && !Link.merged();
    });
}

function draged (currentNode) {
    this.getNodes(function(Node){ return Node.selected() || (Node === currentNode)})
    .forEach(function(Node){
        Node.nudge(d3.event.dx, d3.event.dy, true);
    });

    this.render(true, RENDER_TYPE.NUDGE);
}

const DEFAULT_CONFIG = {
    radius: 15,
    linkWidth: 3,
    movable: true,
    zoomable: true,
    dragable: true,
    ifRender: true,
    color: "#123456"
};

function findShortestPath$1 (fromNode, toNode, Nodes, Links) {
    var srcUUID = fromNode.id,
        dstUUID = toNode.id;

    var S = [];
    var U = [];

    var srcNode = {
        _id: srcUUID,
        _distance: 0,
        _nodesInPath: [],
        _linksInPath: []
    };
    var dstNode = {
        _id: dstUUID,
        _distance: 0,
        _nodesInPath: [],
        _linksInPath: []
    };

    U.push(srcNode);
    while (U.length > 0) {
        var tmpMinDistanceNode = _getMinDistanceNode(U);
        //console.log(tmpMinDistanceNode);
        S.push(tmpMinDistanceNode);
        //console.log(S);
        U.splice(_getNodePositionInArrayList(tmpMinDistanceNode._id, U), 1);
        //console.log(U);

        var tmpAdjNodeList = _getAdjacentNodes(tmpMinDistanceNode._id, Links);
        //console.log(tmpAdjNodeList);


        var dstNodePositionInTmpAdjNodeList = _getNodePositionInArrayList(dstNode._id, tmpAdjNodeList);
        if (dstNodePositionInTmpAdjNodeList > -1) {
            //console.log("found dst");
            var lastLink = _getLinkWithSrcAndDst(dstNode._id, S[S.length - 1]._id, Links);

            dstNode._distance = S[S.length - 1]._distance + lastLink._weight;
            dstNode._nodesInPath = S[S.length - 1]._nodesInPath.slice();
            dstNode._linksInPath = S[S.length - 1]._linksInPath.slice();
            dstNode._nodesInPath.push(dstNode._id);
            dstNode._linksInPath.push(lastLink._id);
            S.push(dstNode);
            break;
        }

        // 如果还没找到终点，那么对所有邻接点
        for (var i = 0; i < tmpAdjNodeList.length; i++) {
            var tmpAdjNode = Object.assign({}, tmpAdjNodeList[i]);
            //console.log(tmpAdjNode);
            var adjNodePositionInS = _getNodePositionInArrayList(tmpAdjNode._id, S);
            if (adjNodePositionInS > -1) {
                continue;
            }

            var index = _getNodePositionInArrayList(tmpAdjNode._id, U);
            if (index > -1) {
                //console.log("adjNode x in U");
                var tmpWeight = _getLinkWithSrcAndDst(tmpAdjNode._id, tmpMinDistanceNode._id, Links)._weight;
                var tmpDistance = Math.min(U[index]._distance, tmpMinDistanceNode._distance + tmpWeight);
                var tmpNode = {};
                tmpNode = {
                    _id: U[index]._id,
                    _distance: tmpDistance,
                    _nodesInPath: [],
                    _linksInPath: []
                };
                var tmpNodePath = [];
                var tmpLinkPath = [];
                if (U[index]._distance > (tmpMinDistanceNode._distance + tmpWeight)) {
                    tmpNodePath = (S[S.length - 2]._nodesInPath).slice();
                    tmpNodePath.push(tmpAdjNode._id);
                    tmpLinkPath = (S[S.length - 2]._linksInPath).slice();
                    tmpLinkPath.push(_getLinkWithSrcAndDst(S[S.length - 2]._id, tmpAdjNode._id)._id, Links);
                    tmpNode._nodesInPath = tmpNodePath.slice();
                    tmpNode._linksInPath = tmpLinkPath.slice();
                    U[index] = tmpNode;
                    //console.log(U);
                }

            } else {
                //console.log(" adjNode x not in U");
                tmpWeight = _getLinkWithSrcAndDst(tmpAdjNode._id, tmpMinDistanceNode._id, Links)._weight;
                tmpDistance = tmpMinDistanceNode._distance + tmpWeight;
                tmpNode = {};
                tmpNode = {
                    _id: tmpAdjNode._id,
                    _distance: tmpDistance,
                    _nodesInPath: [],
                    _linksInPath: []
                };
                tmpNodePath = [];
                tmpLinkPath = [];
                tmpNodePath = (S[S.length - 1]._nodesInPath).slice();
                tmpLinkPath = (S[S.length - 1]._linksInPath).slice();
                tmpNodePath.push(tmpAdjNode._id);
                tmpLinkPath.push(_getLinkWithSrcAndDst(S[S.length - 1]._id, tmpAdjNode._id, Links)._id);

                tmpNode._nodesInPath = tmpNodePath.slice();
                tmpNode._linksInPath = tmpLinkPath.slice();

                U.push(tmpNode);

            }

        }

    }
    var ret = {
        _nodesInPath: [],
        _linksInPath: []
    };
    for (i = 0; i < S.length; i++) {
        if (dstUUID === S[i]._id) {
            S[i]._nodesInPath.unshift(srcUUID);
            ret = S[i];
            break;
        }
    }
    return ret;
}


// 找到SSPFNode list中distance最小的SSPFNode
function _getMinDistanceNode (arrayList) {
    var ret = {
        _distance: Number.POSITIVE_INFINITY
    };
    arrayList.forEach(function (d) {
        if (d._distance < ret._distance) {
            ret._id = d._id;
            ret._distance = d._distance;
            ret._nodesInPath = d._nodesInPath;
            ret._linksInPath = d._linksInPath;
        }
    });
    return ret;
}

// 根据src和dst找到某个边
function _getLinkWithSrcAndDst (src, dst, Links) {
    var ret = {_weight: 0};
    Links.forEach(function (Link) {
        if ((Link.src === src && Link.dst === dst) || (Link.dst === src && Link.src === dst )) {
            ret._id = Link.id;
            ret._src = Link.src;
            ret._dst = Link.dst;
            ret._weight = 1;
            //break;
        }
    });
    return ret;
}

function _getNodePositionInArrayList (id, arrayList) {
    var ret = -1;
    for (var i = 0; i < arrayList.length; i++) {
        if (arrayList[i]._id === id) {
            ret = i;
            break;
        }
    }
    return ret;
}

// 根据该点的id获取邻接点
function _getAdjacentNodes (id, Links) {
    var ret = [];
    var adjacentLinkList = _getAdjacentLinkList(id, Links);
    //console.log(adjacentLinkList);
    adjacentLinkList.forEach(function (d) {
        if (d._src === id) {
            ret.push({
                         _id: d._dst,
                         _distance: d._weight,
                         _nodesInPath: [],
                         _linksInPath: []

                     });
        } else {
            ret.push({
                         _id: d._src,
                         _distance: d._weight,
                         _nodesInPath: [],
                         _linksInPath: []
                     });
        }
    });
    //console.log(ret);
    return ret;
}

function _getAdjacentLinkList (id, Links) {
    var ret = [];
    Links.forEach(function (d) {
        if (d.src === id || d.dst === id) {
            ret.push({
                         _id: d.id,
                         _src: d.src,
                         _dst: d.dst,
                         _weight: 1
                     });
        }
    });
    return ret;
}

function findShortestPath (fromNode, toNode) {
    var res = findShortestPath$1(fromNode, toNode, this.getRenderedNodes(), this.getRenderedLinks());

    return {
        distance: res._distance,
        nodes: this.getNodes(res._nodesInPath),
        links: this.getLinks(res._linksInPath)
    }
}

function gridLayout () {
    var DEBUG = false;
    var self = this;
    var mode = "equal",
        layout = _distributeEqually,
        x = d3.scaleOrdinal(),
        y = d3.scaleOrdinal(),
        size = [1, 1],
        actualSize = [0, 0],
        nodeSize = false,
        bands = false,
        padding = [0, 0],
        cols, rows;

    function grid(nodes) {
        return layout(nodes);
    }

    function _distributeEqually(nodes) {
        var i = -1,
            n = nodes.length,
            _cols = cols ? cols : 0,
            _rows = rows ? rows : 0,
            col, row;

        // FIXME: make explicit rows/cols exclusive? Or find a smart way to deal with overflows (repeat?)
        // FIXME: when rows are set, fill top-to-bottom (make test with 5 data points and 4 rows)

        if (_rows && !_cols) {
            _cols = Math.ceil(n / _rows)
        } else {
            _cols || (_cols = Math.ceil(Math.sqrt(n)));
            _rows || (_rows = Math.ceil(n / _cols));
        }

        if (nodeSize) {
            x.domain(d3.range(_cols)).range(d3.range(0, (size[0] + padding[0]) * _cols, size[0] + padding[0]));
            y.domain(d3.range(_rows)).range(d3.range(0, (size[1] + padding[1]) * _rows, size[1] + padding[1]));
            actualSize[0] = bands ? x(_cols - 1) + size[0] : x(_cols - 1);
            actualSize[1] = bands ? y(_rows - 1) + size[1] : y(_rows - 1);
        } else if (bands) {
            x.domain(d3.range(_cols)).rangeBands([0, size[0]], padding[0], 0);
            y.domain(d3.range(_rows)).rangeBands([0, size[1]], padding[1], 0);
            actualSize[0] = x.rangeBand();
            actualSize[1] = y.rangeBand();
        } else {
            x.domain(d3.range(_cols)).rangePoints([0, size[0]]);
            y.domain(d3.range(_rows)).rangePoints([0, size[1]]);
            actualSize[0] = x(1);
            actualSize[1] = y(1);
        }

        if (DEBUG) console.log('cols/rows', _cols, _rows);

        while (++i < n) {
            col = i % _cols;
            row = Math.floor(i / _cols);

            if (DEBUG) console.log(i, col, row);

            nodes[i].x = x(col);
            nodes[i].y = y(row);
        }

        self.render();

        return nodes;
    }

    // grid.mode = function(value) {
    //   if (!arguments.length) return mode;
    //   switch(mode = value) {
    //     case "equal":
    //       layout = _distributeEqually;
    //       break;
    //   }
    //   return grid;
    // }

    grid.size = function (value) {
        if (!arguments.length) return nodeSize ? actualSize : size;
        actualSize = [0, 0];
        nodeSize = (size = value) == null;
        return grid;
    };

    grid.nodeSize = function (value) {
        if (!arguments.length) return nodeSize ? size : actualSize;
        actualSize = [0, 0];
        nodeSize = (size = value) != null;
        return grid;
    };

    grid.rows = function (value) {
        if (!arguments.length) return rows;
        rows = value;
        return grid;
    };

    grid.cols = function (value) {
        if (!arguments.length) return cols;
        cols = value;
        return grid;
    };

    grid.bands = function () {
        bands = true;
        return grid;
    };

    grid.points = function () {
        bands = false;
        return grid;
    };

    grid.padding = function (value) {
        if (!arguments.length) return padding;
        padding = value;
        return grid;
    };

    return grid;
}

// TODO not complete
function forceLayout () {
    return d3.forceSimulation();
}

// TODO not complete
//树状布局
// functions: layout nodes in hierarchy pattern with a selected node as root.
function hierarchyLayout (selectedNodes, relatedLinks, width, height) {
    function D3_treeNode(node) {
        if (node.children) {
            return Object.assign({}, node);
        }
        var ret = {
            id: node.id,
            children: []
        };
        relatedLinks.forEach(function (w) {
            if (w.src === node.id) {
                ret.children.push({id: w.dst});
            }
        });
        return ret;
    }

    var nodes = selectedNodes.length ? selectedNodes : this.nodesData;
    // initiate coordinates and size of nodes
    nodes.forEach(function (d) {
        d.x = 0;
        d.y = 0;
    });

    var tmpNodesList = []; //store all nodes for tree layout.
    // add all nodes' id and sub node informations to tmpNodesList.
    // for (var i = 0; i < nodes.length; i++) {
    //     var tmp_D3_treeNode = new D3_treeNode(this.nodes[i]);
    //     tmpNodesList.push(tmp_D3_treeNode);
    // }

    // nodes.forEach(function(d){
    //     var tmp_D3_treeNode = D3_treeNode(d);
    //     tmpNodesList.push(tmp_D3_treeNode);
    // });


    for (var i = 0; i < nodes.length; i++) {
        var tmp_D3_treeNode = D3_treeNode(nodes[i]);
        tmp_D3_treeNode.indegree = 0;
        tmpNodesList.push(tmp_D3_treeNode);
    }

    relatedLinks.forEach(function (d) {
        for (var i = 0; i < tmpNodesList.length; i++) {
            if (d.dst === tmpNodesList[i].id) {
                tmpNodesList[i].indegree++;
                break;
            }
        }
    });

    // var minIndegreeNode = nodesIndegreeList[0];
    // for (var i = 0; i < nodesIndegreeList.length; i++) {
    //     if (minIndegreeNode.indegree > nodesIndegreeList[i].indegree) {
    //         minIndegreeNode = nodesIndegreeList[i];
    //     }
    // }

    // console.log(minIndegreeNode)

    // swap first selected node to the head of tmpNodesList
    //
    // for (i = 0; i < tmpNodesList.length; i++) {
    //     if (tmpNodesList[i].id == minIndegreeNode.id) {
    //         tmp_D3_treeNode = tmpNodesList[0];
    //         tmpNodesList[0] = tmpNodesList[i];
    //         tmpNodesList[i] = tmp_D3_treeNode;
    //         break;
    //     }
    // }


    tmpNodesList.sort(function (a, b) {
        return a.indegree == b.indegree ? 0 :
            a.indegree > b.indegree ? 1 : -1;
    });

    // 添加一个根节点，children是入度最小的若干点
    var leastIndegreeNodeList = [];
    for (var i = 0; i < tmpNodesList.length; i++) {
        if (tmpNodesList[i].indegree > tmpNodesList[0].indegree) {
            break;
        }
        leastIndegreeNodeList.push({id: tmpNodesList[i].id})
    }
    var tmp_D3_treeRootNode = D3_treeNode(nodes[0]);
    tmp_D3_treeRootNode.id = "-1";
    tmp_D3_treeRootNode.children = leastIndegreeNodeList;
    tmp_D3_treeRootNode.indegree = -1;
    tmpNodesList.push(tmp_D3_treeRootNode);

    tmpNodesList.sort(function (a, b) {
        return a.indegree == b.indegree ? 0 :
            a.indegree > b.indegree ? 1 : -1;
    });

    var treeNum = 0; // number of trees in forest
    var tree = d3.tree().size([width, height]); // structure of d3 hierarchy layout

    var svg = d3.select("s"); // only for nodes' coordinates calculation, not for rendering.
    var node = svg.selectAll(".n"); // only for nodes' coordinates calculation, not for rendering.
    var layoutNodesList = []; // store nodes coordinates of hierarchy layout.
    var unProcessedNodePos = 0; // position of the node in layoutNodesList that has not been processed.

    // start hierarchy layout
    while (tmpNodesList.length > 0) {
        // a new tree, create layoutNodesList with root.
        if (unProcessedNodePos == 0 && layoutNodesList.length == 0) {
            tmp_D3_treeNode = D3_treeNode(tmpNodesList[0]);
            tmpNodesList.splice(0, 1);
            var root = {};
            layoutNodesList = tree(root); // store nodes coordinates of hierarchy layout.
            root.id = tmp_D3_treeNode.id;
            root.parent = root;
            root.px = root.x;
            root.py = root.y;
        } else if (unProcessedNodePos < layoutNodesList.length) {
            for (var i = 0; i < tmpNodesList.length; i++) {
                if (tmpNodesList[i].id === layoutNodesList[unProcessedNodePos].id) {
                    tmp_D3_treeNode = D3_treeNode(tmpNodesList[i]);
                    tmpNodesList.splice(i, 1);
                    break;
                }
            }
        }

        // add unprocessed node's sub nodes to its children, push its sub nodes into layoutNodesList.
        for (var i = 0; i < tmp_D3_treeNode.children.length; i++) {
            var tmpNode = {id: tmp_D3_treeNode.children[i].id};
            for (var j = 0; j < tmpNodesList.length; j++) {
                // if node still in tmpNodesList and hasn't been processed and deleted.
                if (tmpNode.id == tmpNodesList[j].id) {
                    if (layoutNodesList[unProcessedNodePos].children) {
                        layoutNodesList[unProcessedNodePos].children.push(tmpNode);
                    } else {
                        layoutNodesList[unProcessedNodePos].children = [tmpNode];
                    }

                    var existTag = 0;
                    for (var k = 0; k < layoutNodesList.length; k++) {
                        if (tmpNode.id == layoutNodesList[k].id) {
                            existTag = 1;
                            break;
                        }
                    }
                    if (existTag == 0) {
                        layoutNodesList.push(tmpNode);
                    }

                    break;
                }
            }
        }
        // console.log(layoutNodesList);
        // return;
        unProcessedNodePos++;

        //no node need to push to layoutNodesList, start layout.
        if (unProcessedNodePos == layoutNodesList.length && unProcessedNodePos != 0) {
            node = node.data(tree.nodes(root), function (d) {
                return d.id;
            }); // layout

            // get bottom and rightmost coordinates of nodes that have been calculated.
            var top = 0;
            var left = 0;
            var bottom = 0;
            var right = 0;
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].x < left) {
                    left = nodes[i].x;
                }
                if (nodes[i].x > right) {
                    right = nodes[i].x;
                }
                if (nodes[i].y < top) {
                    top = nodes[i].y;
                }
                if (nodes[i].y > bottom) {
                    bottom = nodes[i].y;
                }
            }

            // set new calculated coordinates to this.nodes
            for (var i = 0; i < nodes.length; i++) {
                for (var j = 0; j < layoutNodesList.length; j++) {
                    if (nodes[i].id == layoutNodesList[j].id) {
                        // here we can change layout of each tree.
                        nodes[i].x = layoutNodesList[j].x + right + 100;
                        nodes[i].y = layoutNodesList[j].y;
                        break;
                    }
                }
            }
            layoutNodesList = [];
            treeNum++;
            unProcessedNodePos = 0;
        }

        // sort remain tmpNodesList with out degree in descending order.
        // tmpNodesList.sort(function(a, b) {
        //     return a.children.length == b.children.length ? 0:
        //         a.children.length > b.children.length ? -1: 1;
        // });

        tmpNodesList.sort(function (a, b) {
            return a.indegree == b.indegree ? 0 :
                a.indegree > b.indegree ? 1 : -1;
        });
    }


};

function getJSON$2 () {
    var json = {
        translate: this._getCurrentTranslate(),
        scale: this._getCurrentScale(),
        nodes: [],
        links: []
    };
    this.getNodes().forEach(function(Node){
       json.nodes.push(Node.getJSON());
    });
    this.getLinks().forEach(function (Link) {
        json.links.push(Link.getJSON());
    });
    return json;
}

//import preTransfer from "./preTransfer";
function Graph(selector, config) {

    this.config = Object.assign({}, DEFAULT_CONFIG, config || {});

    this._canvas = select(selector);

    this._hasInit = false; //init only once
    
    this._nodes = [];
    this._nodesHash = {};
    this._links = [];
    this._linksHash = {};
}

Graph.prototype = {
    constructor: Graph,
    render: render,
    nodes: nodes,
    getNodes: getNodes,
    getSelectedNodes: getSelectedNodes,
    getRenderedNodes: getRenderedNodes,
    getUngroupedNodes: getUngroupedNodes,
    _addNode: addNode,
    removeNodes: removeNodes,
    clearNodes: clearNodes,
    selectNodes: selectNodes,
    unselectNodes: unselectNodes,
    getInvertedNodes: getInvertedNodes,
    getRelatedNodes: getRelatedNodes,
    getLinkedNodes: getLinkedNodes,
    hasNode: hasNode,
    //_preTransfer: preTransfer,
    buildReference: buildReference,
    links: links,
    getLinks: getLinks,
    getRenderedLinks: getRenderedLinks,
    getContainLinks: getContainLinks,
    getAttachedLinks: getAttachedLinks,
    getJSON: getJSON$2,
    _addLink: addLink,
    hasLink: hasLink,
    removeLinks: removeLinks,
    _removeLinksOfNode: removeLinksOfNode,
    clearLinks: clearLinks,
    transform: transform,
    scaleTo: scaleTo,
    translateBy: translateBy,
    group: group,
    groupBy: groupBy,
    flattenGroup: flattenGroup,
    draged: draged,
    findShortestPath: findShortestPath,
    gridLayout: gridLayout,
    forceLayout: forceLayout,
    hierarchyLayout: hierarchyLayout,
    _keydowned: keydowned,
    _keyupped: keyupped,
    _init: init,
    _draw: draw,
    _zoomed: zoomed,
    _getCurrentTransform: function(){
        return d3.zoomTransform(this._canvas);
    },
    _getCurrentScale: function(){
        return this._getCurrentTransform().k;
    },
    _getCurrentTranslate: function(){
        var transform = this._getCurrentTransform();
        return [transform.x, transform.y];
    },
    _getBrushSelection: function () {
        return this._getSvgSelection().select('g.brush');
    },
    _getSvgSelection: function(duration){
        var svgSelection = d3.select(this._canvas);

        if(duration) svgSelection = svgSelection.transition(Math.random()).duration(duration);

        return svgSelection
    },
    _getSelectedNodesSelection: function(){
        return this._getSvgSelection().select('.nodes').selectAll("g.node.selected");
    },
    _getNodesSelection: function(){
        return this._getSvgSelection().select('.nodes').selectAll("g.node");
    },
    _getNodesLabelSelection: function(){
        return this._getNodesSelection().selectAll('.text-group');
    },
    _getLinksSelection: function(){
        return this._getSvgSelection().select('g.paths').selectAll("path");
    },
    _getLinksLabelSelection: function(){
        return this._getSvgSelection().select('g.link-labels').selectAll('text.link-label');
    },
    _getForceGroup: function(){
        return this._forceGroupSelection;
    }
};

function index (selector, config) {
    return new Graph(selector, config);
}

function filterById (id, Nodes) {
    return Nodes.filter(function(Node){
        return Node.id === id;
    })[0];
}

function parseHTML (str) {
    var tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = str;
    return tmp.body.children[0];
}

function safeExecute (maybeFunction) {
    return (maybeFunction instanceof Function)? maybeFunction(): maybeFunction;
}

var utils = {
    filterBy: filterBy,
    filterById: filterById,
    getIds: getIds,
    getAbsUrl: getAbsUrl,
    toArray: toArray,
    getStrLen: getStrLen,
    getOffsetCoordinate: getOffsetCoordinate,
    parseHTML: parseHTML,
    deriveLinkFromLinks: deriveLinkFromLinks,
    deriveLinkFromLNL: deriveLinkFromLNL,
    deriveNodeFromNodes: deriveNodeFromNodes,
    concat: concat,
    average: average,
    direction: direction$1,
    safeExecute: safeExecute
};

exports.graph = index;
exports.utils = utils;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=g3.js.map
