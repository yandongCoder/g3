//g3
(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
   typeof define === 'function' && define.amd ? define(['exports'], factory) :
   (factory((global.g3 = global.g3 || {})));
}(this, function (exports) { 'use strict';

   function select (selector) {
       return typeof selector === "string"? document.querySelector(selector): selector;
   }

   function width (width) {
       if(!arguments.length) {
           return this._width;
       }
       
       this._width = width;

       return this;
   }

   function height (height) {
       if(!arguments.length) {
           return this._height;
       }
       this._height = height;

       return this;
   }

   function render (internalCall) {
       if(!this._autoRender) return this;
       //clearTimeout(this._renderDelay);
       //this._renderDelay = setTimeout(function(){
       this._init();
       this._draw();
       //}.bind(this),0);
           //console.log('render');

       return this;

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

       //this._preTransfer();

       this.render(true);
       
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

   function getRenderedNodes () {
       return this.getNodes(function(Node){
           return !Node.transformed() && !Node.grouped();
       });
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

       this.graph.render(true);

       return this;
   }

   function transformed (transformed) {
       if(!arguments.length) return this._transformed || false;

       this._transformed = transformed;
       
       return this;
   }

   function nudge (nudgeX, nudgeY) {
       this.x += nudgeX;
       this.y += nudgeY;
       this.graph.render(true);
       return this;
   }

   function color (color) {
       if(!arguments.length) return this._color || "#123456";

       this._color = color;
       this.graph.render(true);

       return this;
   }

   function radius (radius) {
       if(!arguments.length) return this._radius;

       this._radius = radius;
       this.graph.render(true);

       return this;
   }

   function label (label) {
       if(!arguments.length) return this._label || "";

       this._label = label;
       this.graph.render(true);

       return this;
   }

   function getX() {
       return this.x;
   }

   function getY() {
       return this.y;
   }

   function filterById (id, Nodes) {
       return Nodes.filter(function(Node){
           return Node.id === id;
       })[0];
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

   const DIRECTION = {
       NONE: 0,
       FROM: 1,
       TO: 2,
       DOUBLE: 3
   };

   function getStartArrow () {
       if(this.direction() === DIRECTION.TO || this.direction() === DIRECTION.DOUBLE)
           return "url(" + window.location.href.split('#')[0] + "#start-arrow)";
       else
           return "";
   }

   function getEndArrow () {
       if(this.direction() === DIRECTION.FROM || this.direction() === DIRECTION.DOUBLE)
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
       this.graph.render(true);

       return this;
   }

   function width$1 (width) {
       if(!arguments.length) return this._width;

       this._width = width;
       this.graph.render(true);

       return this;
   }

   function color$1 (color) {
       if(!arguments.length) return this._color;

       this._color = color;
       this.graph.render(true);

       return this;
   }

   function direction (direction) {
       if(!arguments.length) return this._direction;

       this._direction = direction;
       this.graph.render(true);

       return this;
   }

   function remove () {
       delete this.graph._linksHash[this.id];
       this.graph._links.splice(this.graph._links.indexOf(this), 1);

       this.graph.render(true);

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
           if((p === DIRECTION.FROM && Link.direction() === DIRECTION.TO) || (p === DIRECTION.TO && Link.direction() === DIRECTION.FROM)) return DIRECTION.DOUBLE;
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

   function merge () {
       //每个Link本身只能被合并一次，也意味着只能存在于唯一一个Link的mergedBy属性中，for idempotent, 幂等性
       var toMergedLinks = this.getHomoLinks().filter(function(Link){ return !Link.merged() && !Link.grouped()});

       if(toMergedLinks.length <= 1) return;

       toMergedLinks.forEach(function(Link){
           Link.merged(true);
       });

       var linkObj = deriveLinkFromLinks(toMergedLinks);
       linkObj.mergedBy = toMergedLinks;

       var Link = this.graph._addLink(linkObj);

       Link.NtoL();

       this.graph.render(true);

       return this;
   }

   function flattenMerge () {
       this.getHomoLinks().forEach(function(Link){
          Link.unmerge();
       });

       this.merge();
   }

   function unmerge () {
       if(!this.mergedBy) return;

       this.remove();

       this.mergedBy.forEach(function(Link){
           Link.merged(false);
           Link.NtoL();
       });
       
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
       this.transformedBy.node.transformed(false);

       this.transformedBy.links.forEach(function(Link){
           Link.transformed(false);
       });

       this.remove();

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

   function Link(data, graph) {
       this.graph = graph;
       this.id = data.id;
       this._label = data.label || "";
       this._width = data.width || (graph && graph._linkWidth) || 3;
       this._color = data.color || "#a1a1a1";
       this.src = data.src;
       this.dst = data.dst;
       this._direction = data.direction === undefined? 1: data.direction;//0: none, 1: from, 2: to, 3 double

       this.source = graph && this.graph._nodesHash[this.src];
       this.target = graph && this.graph._nodesHash[this.dst];

       this._needMerged = data.merged || false;

       if(data.mergedBy) this.mergedBy = data.mergedBy;
       if(data.transformedBy) this.transformedBy = data.transformedBy;
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
       label: label$1,
       width: width$1,
       remove: remove,
       merged: merged,
       merge: merge,
       flattenMerge: flattenMerge,
       unmerge: unmerge,
       grouped: grouped,
       LtoN: LtoN,
       NtoL: NtoL$1,
       color: color$1,
       direction: direction,
       getHomoLinks: getHomoLinks,
       hasSourceArrow: function(){
           return this.direction() === DIRECTION.TO || this.direction() === DIRECTION.DOUBLE;
       },
       hasTargetArrow: function(){
           return this.direction() === DIRECTION.FROM || this.direction() === DIRECTION.DOUBLE;
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

   function NtoL () {
       if(this.transformedTo) this.transformedTo.LtoN();//transform a Node that has been transformed before, transform back first.

       var contractedLinks = this.getConnectedLinks(true);

       if(contractedLinks.length !== 2) return;
       
       this.transformed(true);
       contractedLinks.forEach(function(group){
           group.forEach(function(Link){Link.transformed(true);});
       });

       var newLink = deriveLinkFromLNL(contractedLinks[0], this, contractedLinks[1]);

       newLink.transformedBy = {
           node: this,
           links: contractedLinks[0].concat(contractedLinks[1])
       };

      this.transformedTo = this.graph._addLink(newLink);

       this.graph.render(true);
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

   function remove$1 () {
       delete this.graph._nodesHash[this.id];
       this.graph._nodes.splice(this.graph._nodes.indexOf(this), 1);
   }

   function grouped$1 (grouped) {
       if(!arguments.length) return this._grouped === undefined? false : this._grouped;

       this._grouped = grouped;

       return this;
   }

   function ungroup () {
       if(!this.groupedBy || this.grouped()) return;

       this.groupedBy.nodes.forEach(function(Node){
           Node.grouped(false);
       });
       this.groupedBy.links.forEach(function(Link){
           Link.grouped(false);
       });

       this.remove();

       this.graph.render(true);
       return this;
   }

   //data: data obj, graph: graphInstance
   function Node(data, graph) {
       this.graph = graph;
       this.id = data.id;
       this._label = data.label;
       this.x = data.x;
       this.y = data.y;
       this._radius = data.radius || graph._radius;
       this._color = data.color;
       this._selected = data.selected || false; //indicate whether node is select

       this._needTransformed = data.transformed || false;
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
       remove: remove$1,
       NtoL: NtoL,
       getConnectedLinks: getConnectedLinks,
       grouped: grouped$1,
       ungroup: ungroup
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

       this.render(true);

   }

   function clearNodes () {
       this._nodes = [];
   }

   function preTransfer () {
       this._links.forEach(function(Link){
           if(Link._needMerged) Link.flattenMerge();
           delete Link._needMerged;
           Link.NtoL();
       });

       this._nodes.forEach(function(Node){
           if(Node._needTransformed) Node.NtoL();
           delete Node._needTransformed;
       });
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

       this._preTransfer();
       
       this.render(true);
       
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

       this.render(true);
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
       let str = '<defs>'+
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
           .on("drag", function (Node) {
               Node.nudge(d3.event.dx, d3.event.dy);
           }).on("end", function (Node) {

           });
       return drag;
   }

   function init () {
       //init trigger only once a graph
       if(this._hasInit) return;


       //add predefined DOM
       appendPreElement.call(this);
       appendPreDefs.call(this);

       this._getSvgSelection()
           .classed("graph", true);

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

   function drawNodes () {
       var self = this;
       var nodes = this._getNodesSelection().data(this.getRenderedNodes(), function (Node) { return Node.id;});

       var g = nodes.enter().append('g')
           .each(function(Node){ Node._element = this })//reference element to Node
           .classed('node', true)
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
       

       all.select('.text-group')
           .attr('width', function (Node) { return Node.getLabelWidth(); })
           .attr("height", function(Node){ return Node.radius() * self._getCurrentScale(); })
           .style("line-height", function(Node){ return Node.radius() * self._getCurrentScale() + "px"; })
           .attr("transform", function(Node){ return "translate(" + (1 + Node.radius()) + ", 0) scale(" + 1 / self._getCurrentScale()+ ")"; })

           .select('div')
           .attr('title', function (Node) { return Node.label(); })
           .select('span')
           .text(function (Node) { return Node.label(); });

       nodes.exit().remove();
   }

   function drawLinks () {
       var self = this;
       var links = this._getLinksSelection().data(this.getRenderedLinks(), function (Link) { return Link.id });

       links.enter()
           .append('path')
           .classed('link-path', true)
           .attr('id', function(Link){ return "link-path" + Link.id});

       var all  = this._getLinksSelection();

       all
           .attr('d', function (Link) { var c = Link.getCoordination();  return 'M ' + c.Sx + ' ' + c.Sy + ' L ' + c.Tx + ' ' + c.Ty; })
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


       var allLabels = this._getLinksLabelSelection();

       allLabels
           .attr('dx', function(Link){return Link.getTextOffset(); })
           .attr('dy', 1)
           .attr('font-size', 13)
           //反转字体，使字体总是朝上，该句放于该函数最后执行，提前会导致问题
           .attr('transform', function(Link){ return Link.getLinkLabelTransform(self._getCurrentScale()); });

       allLabels.select('textPath')
           .text(function (Link) {
               return Link.label();
           });


       linkLabels.exit().remove();
   }

   function draw () {
       drawNodes.call(this);
       drawLinks.call(this);
   }

   function zoomed () {
       var self = this;
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


       //缩放网络图
       this._getForceGroup().attr("transform", "translate(" + d3.event.transform.x + ", "+ d3.event.transform.y + ") scale(" + self._getCurrentScale() + ")");

       self.render();

       //将状态记录在config中
       // scope.config.status.translate = Graph.zoom.translate();
       // scope.config.status.scale = Graph.zoom.scale();
   }

   function transform (k, x, y, duration) {
       var transformed = d3.zoomIdentity;
       if(typeof k === "number") transformed = transformed.scale(k);
       if(typeof x === "number" && typeof y === "number") transformed = transformed.translate(x, y);
       this._getSvgSelection(duration).call(this.zoom.transform, transformed);
   }

   function scaleTo (k, duration) {
       this.transform(k, null, null, duration);
   }

   function translateBy (x, y, duration) {
       this.transform(null, x, y , duration);
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

       return obj;
   }

   function group (Nodes) {

       Nodes = Nodes.filter(function(Node){ return !Node.grouped() });
       if(Nodes.length <= 1) return;

       Nodes.forEach(function(Node){
           Node.grouped(true);
       });

       var containLinks = this.getContainLinks(Nodes);
       containLinks.forEach(function(Link){
           Link.grouped(true);
       });

       var newNode = this._addNode(deriveNodeFromNodes(Nodes));

       newNode.groupedBy = {
           nodes: Nodes,
           links: containLinks
       };

       var attachedLinks = this.getAttachedLinks(Nodes);
       attachedLinks.forEach(function(Link){
           if(Nodes.indexOf(Link.source) !== -1) Link.source = newNode;
           if(Nodes.indexOf(Link.target) !== -1) Link.target = newNode;
       });

       this.render(true);
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

   function Graph(selector, config) {
       if(config === undefined) config = {};

       this._canvas = select(selector);

       this._hasInit = false; //init only once

       this._radius= config.radius || 15;
       this._linkWidth = config.linkWidth || 3;
       this._movable = config.movable || false;
       this._zoomable = config.zoomable || false;

       this._autoRender  = config.autoRender || false;

       this._nodes = [];
       this._nodesHash = {};
       this._links = [];
       this._linksHash = {};
   }

   Graph.prototype = {
       constructor: Graph,
       width: width,
       height: height,
       render: render,
       nodes: nodes,
       getNodes: getNodes,
       getRenderedNodes: getRenderedNodes,
       _addNode: addNode,
       removeNodes: removeNodes,
       clearNodes: clearNodes,
       hasNode: hasNode,
       _preTransfer: preTransfer,
       links: links,
       getLinks: getLinks,
       getRenderedLinks: getRenderedLinks,
       getContainLinks: getContainLinks,
       getAttachedLinks: getAttachedLinks,
       _addLink: addLink,
       hasLink: hasLink,
       removeLinks: removeLinks,
       _removeLinksOfNode: removeLinksOfNode,
       clearLinks: clearLinks,
       transform: transform,
       scaleTo: scaleTo,
       translateBy: translateBy,
       group: group,
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

}));
//# sourceMappingURL=g3.js.map
