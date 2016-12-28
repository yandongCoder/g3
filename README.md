# g3
基于D3的图可视化库，可与D3无缝混合使用，通过传入数据和简单的配置，渲染出完整的交互式关联图，同时又提供了很多hook进行自定义。

## basic usage
```js
g3.graph("#my-graph",{
            iconPrefix: "fa fa-"
        })
        .nodes(nodesArr)
        .links(linksArr);
```

## config

- **radius** (node's default radius)
    - value: ```number```
    - default: ```15```