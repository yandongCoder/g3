// TODO not complete
function forceLayout() {
    return d3.forceSimulation();
}

function gridLayout() {
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

function hierarchyLayout(selectedNodes, relatedLinks, width, height) {
    function D3_treeNode(node) {
        if (node.children) {
            return Object.assign({}, node);
        }
        var ret = {
            id: node.id,
            children: []
        };
        relatedLinks.forEach(function (Link) {
            if (Link.source.id === node.id) {
                ret.children.push({id: Link.target.id});
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
    
    relatedLinks.forEach(function (Link) {
        for (var i = 0; i < tmpNodesList.length; i++) {
            if (Link.target.id === tmpNodesList[i].id) {
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
    
}

export {forceLayout, gridLayout, hierarchyLayout};