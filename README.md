# g3
基于D3的图可视化库，可与D3无缝混合使用，通过传入数据和简单的配置，渲染出完整的交互式关联图，同时又提供了很多hook进行自定义。

## Basic usage
```js
g3.graph("#my-graph",{
            iconPrefix: "fa fa-"
        })
        .nodes(nodesArr)
        .links(linksArr);
```

## Node's properties

- **id** (id is necessary and unique, node with duplicated id can not be added again.)
- **label** (label of node)
- **x** (x coordination of node)
- **y** (y coordination of node)
- **color** (color of node)
- **radius** (radius of node)
- **icon** (icon of node, very easy to use with Font Awesome)
- **mugshot** (mugshot of node)
- **disabled** (disabled state of node)
- **selected** (selected state of node)

## Link's properties

- **id** (id is necessary and unique, link with duplicated id can not be added again.)
- **label** (label of link)
- **src** (src point to its source node's id, it eventually generate source property that point to source node)
- **dst** (dst point to its target node's id, it eventually generate target property that point to target node)
- **direction**(link arrow's direction)
    - value: 0(no arrow), 1(point to target), 2(point to source), 3(double arrow)
    - default: 1
- **color** (color of link)
- **width** (line width of link)
- **icon** (icon of node, very easy to use with Font Awesome)
- **mugshot** (mugshot of link)
- **disabled** (disabled state of link)
- **selected** (selected state of link)
- **hide** (whether show link)

## config

- **radius** (node's default radius)
    - value: ```number```
    - default: ```15```