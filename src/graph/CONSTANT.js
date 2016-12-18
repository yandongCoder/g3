const DIRECTION = {
    NONE: 0,
    S2D: 1,
    D2S: 2,
    DOUBLE: 3
};

const LINE_TEXT_MARGIN = 2;
const LINE_HEIGHT = 20;
const NODE_TEXT_HEIGHT = 10;// half of node text height in css.

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
    SELECT: "SELECT",
    NUDGE: "NUDGE",
    IMMEDIATELY: "IMMEDIATELY",
    ZOOM: "ZOOM"
};

export {LINE_TEXT_MARGIN, LINE_HEIGHT, NODE_TEXT_HEIGHT, DIRECTION, LINK_REMOVE_TYPE, REMOVE_TYPE, BUILD_REF_TYPE, RENDER_TYPE};