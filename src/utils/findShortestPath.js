export default function (fromNode, toNode, Nodes, Links) {
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
        if ((Link.source.id === src && Link.target.id === dst) || (Link.target.id === src && Link.source.id === dst )) {
            ret._id = Link.id;
            ret._src = Link.source.id;
            ret._dst = Link.target.id;
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
    Links.forEach(function (Link) {
        if (Link.source.id === id || Link.target.id === id) {
            ret.push({
                         _id: Link.id,
                         _src: Link.source.id,
                         _dst: Link.target.id,
                         _weight: 1
                     });
        }
    });
    return ret;
}