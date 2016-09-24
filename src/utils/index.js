import filterBy from "./filterBy";
import filterById from "./filterById";
import getIds from "./getIds";
import toArray from "./toArray";
import getStrLen from "./getStrLen";
import getOffsetCoordinate from "./getOffsetCoordinate";
import getAbsUrl from "./getAbsUrl";
import parseHTML from "./parseHTML";
import deriveLinkFromLinks from "./deriveLinkFromLinks";
import deriveLinkFromLNL from "./deriveLinkFromLNL";
import concat from "./concat";

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
    concat: concat
};

export default utils;