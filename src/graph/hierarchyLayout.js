// TODO not complete
//树状布局
// functions: layout nodes in hierarchy pattern with a selected node as root.
export default function (selectedNodes, relatedLinks, width, height) {
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