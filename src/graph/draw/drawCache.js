/**
 * Created by lcx on 2016/12/8.
 */
export default function (canvasObj,keyWord,target) {
    var cache = this.nodesCache;
    var context = this.element.getContext('2d');
    for(var i=0;i<cache.length;i++){
        context.drawImage(cache[i],0,0);
    }

}
