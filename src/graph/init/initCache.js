/**
 * Created by lcx on 2016/12/8.
 */
import drawCanvasNode from '../draw/drawCanvasNode';
import drawCanvasLink from '../draw/drawCanvasLink';
export default function () {
    var that = this;
    var nodes = that.getNodes();
    var links = that.getLinks();
    var nodesCache = [],linksCache = [];

    for(var i=0;i<nodes.length;i++){
        var tempCanvas = document.createElement('canvas');
        nodesCache.push(tempCanvas);
    }
    for(var j=0;j<links.length;j++){
        var tempCanvas = document.createElement('canvas');
        linksCache.push(tempCanvas);
    }
    this.linksCache = linksCache;
    this.nodesCache = nodesCache;
    var canvasObj = {
        nodes:that.getRenderedNodes(),
        links:that.getRenderedLinks(),
        linksCache:that.linksCache,
        nodesCache:that.nodesCache
    };
    console.log('initCache');
    drawCanvasLink(canvasObj);
    drawCanvasNode(canvasObj);

}