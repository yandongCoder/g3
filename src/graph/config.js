import assign from "../utils/assign";

const DEFAULT_CONFIG = {
    radius: 15,
    linkWidth: 3,
    movable: true,
    zoomable: true,
    dragable: true,
    ifRender: true,
    color: "#123456",
    nodeLabelClipWidth: 500,
    linkColor: "#a1a1a1",
    background: "#f1f1f1",
    minScale: 0.1,
    maxScale: 3.0,
    scaleOfHideNodeLabel: 0.8,
    scaleOfHideLinkLabel: 0.8,
    icon: "",
    iconPrefix: "",
    mugshot: "",
    mugshotPrefix: "",
    
    insertNode: function(){},
    updateNode: function(){},
    
    onBrushStart: function(){},
    onBrush: function(){},
    onBrushEnd: function(){},
    
    onZoomStart: function(){},
    onZoom: function(){},
    onZoomEnd: function(){},
    
    bindGraphEvent: function(){},
    bindNodeEvent: function(){},
    bindLinkEvent: function(){},
    radiusFunc: null
};


function config(config) {
    if(!arguments.length) return this._config;
    
    this._config = assign({}, DEFAULT_CONFIG, this._config || {}, config || {});
    return this;
}

function selector(selector){
    if(!arguments.length) return this._selector;
    
    this._selector = selector;
    return this;
}

export {selector, config}