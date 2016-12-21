//g3
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.g3 = global.g3 || {})));
}(this, (function (exports) { 'use strict';

const DIRECTION = {
    NONE: 0,
    S2D: 1,
    D2S: 2,
    DOUBLE: 3
};
const COLOR$1 = '#00a';

const FONT = {
    "fa-500px": "f26e",
    "fa-adjust": "f042",
    "fa-adn": "f170",
    "fa-align-center": "f037",
    "fa-align-justify": "f039",
    "fa-align-left": "f036",
    "fa-align-right": "f038",
    "fa-amazon": "f270",
    "fa-ambulance": "f0f9",
    "fa-anchor": "f13d",
    "fa-android": "f17b",
    "fa-angellist": "f209",
    "fa-angle-double-down": "f103",
    "fa-angle-double-left": "f100",
    "fa-angle-double-right": "f101",
    "fa-angle-double-up": "f102",
    "fa-angle-down": "f107",
    "fa-angle-left": "f104",
    "fa-angle-right": "f105",
    "fa-angle-up": "f106",
    "fa-apple": "f179",
    "fa-archive": "f187",
    "fa-area-chart": "f1fe",
    "fa-arrow-circle-down": "f0ab",
    "fa-arrow-circle-left": "f0a8",
    "fa-arrow-circle-o-down": "f01a",
    "fa-arrow-circle-o-left": "f190",
    "fa-arrow-circle-o-right": "f18e",
    "fa-arrow-circle-o-up": "f01b",
    "fa-arrow-circle-right": "f0a9",
    "fa-arrow-circle-up": "f0aa",
    "fa-arrow-down": "f063",
    "fa-arrow-left": "f060",
    "fa-arrow-right": "f061",
    "fa-arrow-up": "f062",
    "fa-arrows": "f047",
    "fa-arrows-alt": "f0b2",
    "fa-arrows-h": "f07e",
    "fa-arrows-v": "f07d",
    "fa-asterisk": "f069",
    "fa-at": "f1fa",
    "fa-backward": "f04a",
    "fa-balance-scale": "f24e",
    "fa-ban": "f05e",
    "fa-bar-chart": "f080",
    "fa-barcode": "f02a",
    "fa-bars": "f0c9",
    "fa-battery-empty": "f244",
    "fa-battery-full": "f240",
    "fa-battery-half": "f242",
    "fa-battery-quarter": "f243",
    "fa-battery-three-quarters": "f241",
    "fa-bed": "f236",
    "fa-beer": "f0fc",
    "fa-behance": "f1b4",
    "fa-behance-square": "f1b5",
    "fa-bell": "f0f3",
    "fa-bell-o": "f0a2",
    "fa-bell-slash": "f1f6",
    "fa-bell-slash-o": "f1f7",
    "fa-bicycle": "f206",
    "fa-binoculars": "f1e5",
    "fa-birthday-cake": "f1fd",
    "fa-bitbucket": "f171",
    "fa-bitbucket-square": "f172",
    "fa-black-tie": "f27e",
    "fa-bold": "f032",
    "fa-bolt": "f0e7",
    "fa-bomb": "f1e2",
    "fa-book": "f02d",
    "fa-bookmark": "f02e",
    "fa-bookmark-o": "f097",
    "fa-briefcase": "f0b1",
    "fa-btc": "f15a",
    "fa-bug": "f188",
    "fa-building": "f1ad",
    "fa-building-o": "f0f7",
    "fa-bullhorn": "f0a1",
    "fa-bullseye": "f140",
    "fa-bus": "f207",
    "fa-buysellads": "f20d",
    "fa-calculator": "f1ec",
    "fa-calendar": "f073",
    "fa-calendar-check-o": "f274",
    "fa-calendar-minus-o": "f272",
    "fa-calendar-o": "f133",
    "fa-calendar-plus-o": "f271",
    "fa-calendar-times-o": "f273",
    "fa-camera": "f030",
    "fa-camera-retro": "f083",
    "fa-car": "f1b9",
    "fa-caret-down": "f0d7",
    "fa-caret-left": "f0d9",
    "fa-caret-right": "f0da",
    "fa-caret-square-o-down": "f150",
    "fa-caret-square-o-left": "f191",
    "fa-caret-square-o-right": "f152",
    "fa-caret-square-o-up": "f151",
    "fa-caret-up": "f0d8",
    "fa-cart-arrow-down": "f218",
    "fa-cart-plus": "f217",
    "fa-cc": "f20a",
    "fa-cc-amex": "f1f3",
    "fa-cc-diners-club": "f24c",
    "fa-cc-discover": "f1f2",
    "fa-cc-jcb": "f24b",
    "fa-cc-mastercard": "f1f1",
    "fa-cc-paypal": "f1f4",
    "fa-cc-stripe": "f1f5",
    "fa-cc-visa": "f1f0",
    "fa-certificate": "f0a3",
    "fa-chain-broken": "f127",
    "fa-check": "f00c",
    "fa-check-circle": "f058",
    "fa-check-circle-o": "f05d",
    "fa-check-square": "f14a",
    "fa-check-square-o": "f046",
    "fa-chevron-circle-down": "f13a",
    "fa-chevron-circle-left": "f137",
    "fa-chevron-circle-right": "f138",
    "fa-chevron-circle-up": "f139",
    "fa-chevron-down": "f078",
    "fa-chevron-left": "f053",
    "fa-chevron-right": "f054",
    "fa-chevron-up": "f077",
    "fa-child": "f1ae",
    "fa-chrome": "f268",
    "fa-circle": "f111",
    "fa-circle-o": "f10c",
    "fa-circle-o-notch": "f1ce",
    "fa-circle-thin": "f1db",
    "fa-clipboard": "f0ea",
    "fa-clock-o": "f017",
    "fa-clone": "f24d",
    "fa-cloud": "f0c2",
    "fa-cloud-download": "f0ed",
    "fa-cloud-upload": "f0ee",
    "fa-code": "f121",
    "fa-code-fork": "f126",
    "fa-codepen": "f1cb",
    "fa-coffee": "f0f4",
    "fa-cog": "f013",
    "fa-cogs": "f085",
    "fa-columns": "f0db",
    "fa-comment": "f075",
    "fa-comment-o": "f0e5",
    "fa-commenting": "f27a",
    "fa-commenting-o": "f27b",
    "fa-comments": "f086",
    "fa-comments-o": "f0e6",
    "fa-compass": "f14e",
    "fa-compress": "f066",
    "fa-connectdevelop": "f20e",
    "fa-contao": "f26d",
    "fa-copyright": "f1f9",
    "fa-creative-commons": "f25e",
    "fa-credit-card": "f09d",
    "fa-crop": "f125",
    "fa-crosshairs": "f05b",
    "fa-css3": "f13c",
    "fa-cube": "f1b2",
    "fa-cubes": "f1b3",
    "fa-cutlery": "f0f5",
    "fa-dashcube": "f210",
    "fa-database": "f1c0",
    "fa-delicious": "f1a5",
    "fa-desktop": "f108",
    "fa-deviantart": "f1bd",
    "fa-diamond": "f219",
    "fa-digg": "f1a6",
    "fa-dot-circle-o": "f192",
    "fa-download": "f019",
    "fa-dribbble": "f17d",
    "fa-dropbox": "f16b",
    "fa-drupal": "f1a9",
    "fa-eject": "f052",
    "fa-ellipsis-h": "f141",
    "fa-ellipsis-v": "f142",
    "fa-empire": "f1d1",
    "fa-envelope": "f0e0",
    "fa-envelope-o": "f003",
    "fa-envelope-square": "f199",
    "fa-eraser": "f12d",
    "fa-eur": "f153",
    "fa-exchange": "f0ec",
    "fa-exclamation": "f12a",
    "fa-exclamation-circle": "f06a",
    "fa-exclamation-triangle": "f071",
    "fa-expand": "f065",
    "fa-expeditedssl": "f23e",
    "fa-external-link": "f08e",
    "fa-external-link-square": "f14c",
    "fa-eye": "f06e",
    "fa-eye-slash": "f070",
    "fa-eyedropper": "f1fb",
    "fa-facebook": "f09a",
    "fa-facebook-official": "f230",
    "fa-facebook-square": "f082",
    "fa-fast-backward": "f049",
    "fa-fast-forward": "f050",
    "fa-fax": "f1ac",
    "fa-female": "f182",
    "fa-fighter-jet": "f0fb",
    "fa-file": "f15b",
    "fa-file-archive-o": "f1c6",
    "fa-file-audio-o": "f1c7",
    "fa-file-code-o": "f1c9",
    "fa-file-excel-o": "f1c3",
    "fa-file-image-o": "f1c5",
    "fa-file-o": "f016",
    "fa-file-pdf-o": "f1c1",
    "fa-file-powerpoint-o": "f1c4",
    "fa-file-text": "f15c",
    "fa-file-text-o": "f0f6",
    "fa-file-video-o": "f1c8",
    "fa-file-word-o": "f1c2",
    "fa-files-o": "f0c5",
    "fa-film": "f008",
    "fa-filter": "f0b0",
    "fa-fire": "f06d",
    "fa-fire-extinguisher": "f134",
    "fa-firefox": "f269",
    "fa-flag": "f024",
    "fa-flag-checkered": "f11e",
    "fa-flag-o": "f11d",
    "fa-flask": "f0c3",
    "fa-flickr": "f16e",
    "fa-floppy-o": "f0c7",
    "fa-folder": "f07b",
    "fa-folder-o": "f114",
    "fa-folder-open": "f07c",
    "fa-folder-open-o": "f115",
    "fa-font": "f031",
    "fa-fonticons": "f280",
    "fa-forumbee": "f211",
    "fa-forward": "f04e",
    "fa-foursquare": "f180",
    "fa-frown-o": "f119",
    "fa-futbol-o": "f1e3",
    "fa-gamepad": "f11b",
    "fa-gavel": "f0e3",
    "fa-gbp": "f154",
    "fa-genderless": "f22d",
    "fa-get-pocket": "f265",
    "fa-gg": "f260",
    "fa-gg-circle": "f261",
    "fa-gift": "f06b",
    "fa-git": "f1d3",
    "fa-git-square": "f1d2",
    "fa-github": "f09b",
    "fa-github-alt": "f113",
    "fa-github-square": "f092",
    "fa-glass": "f000",
    "fa-globe": "f0ac",
    "fa-google": "f1a0",
    "fa-google-plus": "f0d5",
    "fa-google-plus-square": "f0d4",
    "fa-google-wallet": "f1ee",
    "fa-graduation-cap": "f19d",
    "fa-gratipay": "f184",
    "fa-h-square": "f0fd",
    "fa-hacker-news": "f1d4",
    "fa-hand-lizard-o": "f258",
    "fa-hand-o-down": "f0a7",
    "fa-hand-o-left": "f0a5",
    "fa-hand-o-right": "f0a4",
    "fa-hand-o-up": "f0a6",
    "fa-hand-paper-o": "f256",
    "fa-hand-peace-o": "f25b",
    "fa-hand-pointer-o": "f25a",
    "fa-hand-rock-o": "f255",
    "fa-hand-scissors-o": "f257",
    "fa-hand-spock-o": "f259",
    "fa-hdd-o": "f0a0",
    "fa-header": "f1dc",
    "fa-headphones": "f025",
    "fa-heart": "f004",
    "fa-heart-o": "f08a",
    "fa-heartbeat": "f21e",
    "fa-history": "f1da",
    "fa-home": "f015",
    "fa-hospital-o": "f0f8",
    "fa-hourglass": "f254",
    "fa-hourglass-end": "f253",
    "fa-hourglass-half": "f252",
    "fa-hourglass-o": "f250",
    "fa-hourglass-start": "f251",
    "fa-houzz": "f27c",
    "fa-html5": "f13b",
    "fa-i-cursor": "f246",
    "fa-ils": "f20b",
    "fa-inbox": "f01c",
    "fa-indent": "f03c",
    "fa-industry": "f275",
    "fa-info": "f129",
    "fa-info-circle": "f05a",
    "fa-inr": "f156",
    "fa-instagram": "f16d",
    "fa-internet-explorer": "f26b",
    "fa-ioxhost": "f208",
    "fa-italic": "f033",
    "fa-joomla": "f1aa",
    "fa-jpy": "f157",
    "fa-jsfiddle": "f1cc",
    "fa-key": "f084",
    "fa-keyboard-o": "f11c",
    "fa-krw": "f159",
    "fa-language": "f1ab",
    "fa-laptop": "f109",
    "fa-lastfm": "f202",
    "fa-lastfm-square": "f203",
    "fa-leaf": "f06c",
    "fa-leanpub": "f212",
    "fa-lemon-o": "f094",
    "fa-level-down": "f149",
    "fa-level-up": "f148",
    "fa-life-ring": "f1cd",
    "fa-lightbulb-o": "f0eb",
    "fa-line-chart": "f201",
    "fa-link": "f0c1",
    "fa-linkedin": "f0e1",
    "fa-linkedin-square": "f08c",
    "fa-linux": "f17c",
    "fa-list": "f03a",
    "fa-list-alt": "f022",
    "fa-list-ol": "f0cb",
    "fa-list-ul": "f0ca",
    "fa-location-arrow": "f124",
    "fa-lock": "f023",
    "fa-long-arrow-down": "f175",
    "fa-long-arrow-left": "f177",
    "fa-long-arrow-right": "f178",
    "fa-long-arrow-up": "f176",
    "fa-magic": "f0d0",
    "fa-magnet": "f076",
    "fa-male": "f183",
    "fa-map": "f279",
    "fa-map-marker": "f041",
    "fa-map-o": "f278",
    "fa-map-pin": "f276",
    "fa-map-signs": "f277",
    "fa-mars": "f222",
    "fa-mars-double": "f227",
    "fa-mars-stroke": "f229",
    "fa-mars-stroke-h": "f22b",
    "fa-mars-stroke-v": "f22a",
    "fa-maxcdn": "f136",
    "fa-meanpath": "f20c",
    "fa-medium": "f23a",
    "fa-medkit": "f0fa",
    "fa-meh-o": "f11a",
    "fa-mercury": "f223",
    "fa-microphone": "f130",
    "fa-microphone-slash": "f131",
    "fa-minus": "f068",
    "fa-minus-circle": "f056",
    "fa-minus-square": "f146",
    "fa-minus-square-o": "f147",
    "fa-mobile": "f10b",
    "fa-money": "f0d6",
    "fa-moon-o": "f186",
    "fa-motorcycle": "f21c",
    "fa-mouse-pointer": "f245",
    "fa-music": "f001",
    "fa-neuter": "f22c",
    "fa-newspaper-o": "f1ea",
    "fa-object-group": "f247",
    "fa-object-ungroup": "f248",
    "fa-odnoklassniki": "f263",
    "fa-odnoklassniki-square": "f264",
    "fa-opencart": "f23d",
    "fa-openid": "f19b",
    "fa-opera": "f26a",
    "fa-optin-monster": "f23c",
    "fa-outdent": "f03b",
    "fa-pagelines": "f18c",
    "fa-paint-brush": "f1fc",
    "fa-paper-plane": "f1d8",
    "fa-paper-plane-o": "f1d9",
    "fa-paperclip": "f0c6",
    "fa-paragraph": "f1dd",
    "fa-pause": "f04c",
    "fa-paw": "f1b0",
    "fa-paypal": "f1ed",
    "fa-pencil": "f040",
    "fa-pencil-square": "f14b",
    "fa-pencil-square-o": "f044",
    "fa-phone": "f095",
    "fa-phone-square": "f098",
    "fa-picture-o": "f03e",
    "fa-pie-chart": "f200",
    "fa-pied-piper": "f1a7",
    "fa-pied-piper-alt": "f1a8",
    "fa-pinterest": "f0d2",
    "fa-pinterest-p": "f231",
    "fa-pinterest-square": "f0d3",
    "fa-plane": "f072",
    "fa-play": "f04b",
    "fa-play-circle": "f144",
    "fa-play-circle-o": "f01d",
    "fa-plug": "f1e6",
    "fa-plus": "f067",
    "fa-plus-circle": "f055",
    "fa-plus-square": "f0fe",
    "fa-plus-square-o": "f196",
    "fa-power-off": "f011",
    "fa-print": "f02f",
    "fa-puzzle-piece": "f12e",
    "fa-qq": "f1d6",
    "fa-qrcode": "f029",
    "fa-question": "f128",
    "fa-question-circle": "f059",
    "fa-quote-left": "f10d",
    "fa-quote-right": "f10e",
    "fa-random": "f074",
    "fa-rebel": "f1d0",
    "fa-recycle": "f1b8",
    "fa-reddit": "f1a1",
    "fa-reddit-square": "f1a2",
    "fa-refresh": "f021",
    "fa-registered": "f25d",
    "fa-renren": "f18b",
    "fa-repeat": "f01e",
    "fa-reply": "f112",
    "fa-reply-all": "f122",
    "fa-retweet": "f079",
    "fa-road": "f018",
    "fa-rocket": "f135",
    "fa-rss": "f09e",
    "fa-rss-square": "f143",
    "fa-rub": "f158",
    "fa-safari": "f267",
    "fa-scissors": "f0c4",
    "fa-search": "f002",
    "fa-search-minus": "f010",
    "fa-search-plus": "f00e",
    "fa-sellsy": "f213",
    "fa-server": "f233",
    "fa-share": "f064",
    "fa-share-alt": "f1e0",
    "fa-share-alt-square": "f1e1",
    "fa-share-square": "f14d",
    "fa-share-square-o": "f045",
    "fa-shield": "f132",
    "fa-ship": "f21a",
    "fa-shirtsinbulk": "f214",
    "fa-shopping-cart": "f07a",
    "fa-sign-in": "f090",
    "fa-sign-out": "f08b",
    "fa-signal": "f012",
    "fa-simplybuilt": "f215",
    "fa-sitemap": "f0e8",
    "fa-skyatlas": "f216",
    "fa-skype": "f17e",
    "fa-slack": "f198",
    "fa-sliders": "f1de",
    "fa-slideshare": "f1e7",
    "fa-smile-o": "f118",
    "fa-sort": "f0dc",
    "fa-sort-alpha-asc": "f15d",
    "fa-sort-alpha-desc": "f15e",
    "fa-sort-amount-asc": "f160",
    "fa-sort-amount-desc": "f161",
    "fa-sort-asc": "f0de",
    "fa-sort-desc": "f0dd",
    "fa-sort-numeric-asc": "f162",
    "fa-sort-numeric-desc": "f163",
    "fa-soundcloud": "f1be",
    "fa-space-shuttle": "f197",
    "fa-spinner": "f110",
    "fa-spoon": "f1b1",
    "fa-spotify": "f1bc",
    "fa-square": "f0c8",
    "fa-square-o": "f096",
    "fa-stack-exchange": "f18d",
    "fa-stack-overflow": "f16c",
    "fa-star": "f005",
    "fa-star-half": "f089",
    "fa-star-half-o": "f123",
    "fa-star-o": "f006",
    "fa-steam": "f1b6",
    "fa-steam-square": "f1b7",
    "fa-step-backward": "f048",
    "fa-step-forward": "f051",
    "fa-stethoscope": "f0f1",
    "fa-sticky-note": "f249",
    "fa-sticky-note-o": "f24a",
    "fa-stop": "f04d",
    "fa-street-view": "f21d",
    "fa-strikethrough": "f0cc",
    "fa-stumbleupon": "f1a4",
    "fa-stumbleupon-circle": "f1a3",
    "fa-subscript": "f12c",
    "fa-subway": "f239",
    "fa-suitcase": "f0f2",
    "fa-sun-o": "f185",
    "fa-superscript": "f12b",
    "fa-table": "f0ce",
    "fa-tablet": "f10a",
    "fa-tachometer": "f0e4",
    "fa-tag": "f02b",
    "fa-tags": "f02c",
    "fa-tasks": "f0ae",
    "fa-taxi": "f1ba",
    "fa-television": "f26c",
    "fa-tencent-weibo": "f1d5",
    "fa-terminal": "f120",
    "fa-text-height": "f034",
    "fa-text-width": "f035",
    "fa-th": "f00a",
    "fa-th-large": "f009",
    "fa-th-list": "f00b",
    "fa-thumb-tack": "f08d",
    "fa-thumbs-down": "f165",
    "fa-thumbs-o-down": "f088",
    "fa-thumbs-o-up": "f087",
    "fa-thumbs-up": "f164",
    "fa-ticket": "f145",
    "fa-times": "f00d",
    "fa-times-circle": "f057",
    "fa-times-circle-o": "f05c",
    "fa-tint": "f043",
    "fa-toggle-off": "f204",
    "fa-toggle-on": "f205",
    "fa-trademark": "f25c",
    "fa-train": "f238",
    "fa-transgender": "f224",
    "fa-transgender-alt": "f225",
    "fa-trash": "f1f8",
    "fa-trash-o": "f014",
    "fa-tree": "f1bb",
    "fa-trello": "f181",
    "fa-tripadvisor": "f262",
    "fa-trophy": "f091",
    "fa-truck": "f0d1",
    "fa-try": "f195",
    "fa-tty": "f1e4",
    "fa-tumblr": "f173",
    "fa-tumblr-square": "f174",
    "fa-twitch": "f1e8",
    "fa-twitter": "f099",
    "fa-twitter-square": "f081",
    "fa-umbrella": "f0e9",
    "fa-underline": "f0cd",
    "fa-undo": "f0e2",
    "fa-university": "f19c",
    "fa-unlock": "f09c",
    "fa-unlock-alt": "f13e",
    "fa-upload": "f093",
    "fa-usd": "f155",
    "fa-user": "f007",
    "fa-user-md": "f0f0",
    "fa-user-plus": "f234",
    "fa-user-secret": "f21b",
    "fa-user-times": "f235",
    "fa-users": "f0c0",
    "fa-venus": "f221",
    "fa-venus-double": "f226",
    "fa-venus-mars": "f228",
    "fa-viacoin": "f237",
    "fa-video-camera": "f03d",
    "fa-vimeo": "f27d",
    "fa-vimeo-square": "f194",
    "fa-vine": "f1ca",
    "fa-vk": "f189",
    "fa-volume-down": "f027",
    "fa-volume-off": "f026",
    "fa-volume-up": "f028",
    "fa-weibo": "f18a",
    "fa-weixin": "f1d7",
    "fa-whatsapp": "f232",
    "fa-wheelchair": "f193",
    "fa-wifi": "f1eb",
    "fa-wikipedia-w": "f266",
    "fa-windows": "f17a",
    "fa-wordpress": "f19a",
    "fa-wrench": "f0ad",
    "fa-xing": "f168",
    "fa-xing-square": "f169",
    "fa-y-combinator": "f23b",
    "fa-yahoo": "f19e",
    "fa-yelp": "f1e9",
    "fa-youtube": "f167",
    "fa-youtube-play": "f16a",
    "fa-youtube-square": "f166"
};

const LINK_REMOVE_TYPE = {
    UNMERGE: 1,
    L2N: 2
};
const REMOVE_TYPE = {
    UNGROUP: 1
};

const RENDER_TYPE = {
    SELECT: "SELECT",
    NUDGE: "NUDGE",
    IMMEDIATELY: "IMMEDIATELY"
};

var select = function (selector) {
    return typeof selector === "string"? document.querySelector(selector): selector;
};

function delayRender(Obj, renderType){
    this.updateDOM.addObj(Obj, renderType);
    this._render(renderType);
    return this;
}

function render(){
    this._render(RENDER_TYPE.IMMEDIATELY);
    return this;
}

function _render(renderType) {
    var self = this;
    
    this.element = select(this._selector);
    
    if(!this.element) return this;
    if(!this._config.ifRender) return this;
    var canvasType = this.element.nodeName;
    if(canvasType === 'svg'){ this._init();}
   /* else{
        this._initCache();
    }*/
    
    if(renderType === RENDER_TYPE.IMMEDIATELY){
        draw(renderType);
    }
    else{
        clearTimeout(this._renderDelay);
        this._renderDelay = setTimeout(function timeoutDraw(){draw(renderType);}, 0);
    }
    
    return this;
    
    function draw(renderType){
        self._draw(renderType, canvasType);
    }
}

var toArray = function (maybeArr) {
    if(!Array.isArray(maybeArr)) maybeArr = [maybeArr];
    return maybeArr;
};

//中文为2长度，非中文为1

var getStrLen = function (str) {
    var len = 0;
    if (typeof str !== "string") {
        str = str.toString();
    }
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) > '~') {
            len += 2;
        } else {
            len++;
        }
    }
    return len;
};

var attr = function (prop, val){
    if(val === undefined) return this[prop];
    
    val = val instanceof Function? val(this): val;
    if(val === this[prop]) return;
    this[prop] = val;
    
    // this.graph.delayRender(this);
    this.graph.render(this);

    return this;
};

function getX() {
    return this.x || 0;
}

function getY() {
    return this.y || 0;
}

var nudge = function (nudgeX, nudgeY) {
    if(!this.graph._config.dragable) return;
    
    this.x += nudgeX;
    this.y += nudgeY;
    
    return this;
};

var getConnectedLinks = function (grouped) {
    var connectedLinks = this.graph._links.filter(function (Link) {
        return (Link.source === this) || (Link.target === this);
    }, this);
    
    if(grouped){
        var separated = {};

        connectedLinks.forEach(function(Link){
            var separatedId = Link.getSourceId() === this.id? Link.getTargetId(): Link.getSourceId();
            if(separated[separatedId] === undefined) separated[separatedId] = [];
            separated[separatedId].push(Link);
        },this);

        connectedLinks = [];
        for (var k in separated){
            connectedLinks.push(separated[k]);
        }
    }

    return connectedLinks;
};

var remove = function (removeType) {
    delete this.graph._nodesHash[this.id];
    this.graph._nodes.splice(this.graph._nodes.indexOf(this), 1);
    
    if(this.groupedBy && (removeType !== REMOVE_TYPE.UNGROUP) ) this.groupedBy.remove();
};

//data: data obj, graph: graphInstance
function Node(data, graph) {
    this.graph = graph;
    this.id = data.id;
    this.label = data.label || "";
    this.x = data.x;
    this.y = data.y;
    this.disabled = data.disabled || false;
    this.radius = data.radius || graph._config.radius;
    this.color = data.color || graph._config.color;
    this.icon = data.icon  || graph._config.icon;
    this.mugshot = data.mugshot || graph._config.mugshot;
    this.selected = data.selected || false;
    
    for (var prop in data) {
        if (data.hasOwnProperty(prop) && this[prop] === undefined) this[prop] = data[prop];
    }
}

Node.prototype = {
    constructor: Node,
    _nudge: nudge,
    attr: attr,
    getX: getX,
    getY: getY,
    getLabelWidth: function(){
        return getStrLen(this.attr("label")) * 9;
    },
    remove: remove,
    getConnectedLinks: getConnectedLinks
};

//Link has source and target Node in _nodes
var hasST = function () {
    return (this.source !== undefined) && (this.target !== undefined);
};

var getOffsetCoordinate = function (Sx, Sy, Tx, Ty, offsetS, offsetT) {
    var l = Math.sqrt((Tx - Sx) * (Tx - Sx) + (Ty - Sy) * (Ty - Sy));
    if(l === 0) l = 1;

    var sin = (Ty - Sy) / l;
    var cos = (Tx - Sx) / l;
    
    return {
        Sx: Sx + offsetS * cos,
        Sy: Sy + offsetS * sin,
        Tx: Tx - offsetT * cos,
        Ty: Ty - offsetT * sin
    }
};

var absUrl = window.location.href.split('#')[0];

function getStartArrow() {
    if(this.attr("selected")) var status = "-selected";
    else status = "-" + this.attr("color");
    
    if(this.attr("direction") === DIRECTION.D2S || this.attr("direction") === DIRECTION.DOUBLE)
        return "url(" + absUrl + "#start-arrow"+ status +")";
    else
        return "";
}

function getEndArrow () {
    if(this.attr("selected")) var status = "-selected";
    else status = "-" + this.attr("color");
    
    if(this.attr("direction") === DIRECTION.S2D || this.attr("direction") === DIRECTION.DOUBLE)
        return "url(" + absUrl + "#end-arrow"+ status +")";
    else
        return "";
}

function LineWidth(scale){
    var c = this.getCoordination(true);
    var x = c.Tx - c.Sx;
    var y = c.Ty - c.Sy;
    var z = Math.sqrt(x*x + y*y) * scale;
    
    return z;
}

function LineHeight(scale) {
    return this.attr("width") * scale;
}

function getLinkInfoTransform(scale) {
    var c = this.getCoordination(true);
    var rx = (c.Sx + c.Tx) / 2;
    var ry = (c.Sy + c.Ty) / 2;
    
    var x = c.Tx - c.Sx;
    var y = c.Ty - c.Sy;

    var radians =  Math.atan2(y, x) || 0;
    if (radians < 0) radians += 2 * Math.PI;
    var degrees = radians * 180 / Math.PI;
    if(degrees > 90 && degrees < 270) degrees -= 180;
    
    var transform  = 'rotate('+ degrees +' '+ rx +' '+ ry +') translate(' + rx + ' ' + ry + ') scale(' + 1 / scale + ')' + '';
    
    var offsetX =  - this.LineWidth(scale) / 2;
    var offsetY =  this.LineHeight(scale) / 2 + 5;
    transform += ' translate('+ offsetX +' '+ offsetY +')';
    
    return transform;
}

//Link coordination is Node center's coordination or coordination where arrow placed, if any.
function getCoordination(forText) {
    
    var sourceOffset = this.source.attr("radius");
    var targetOffset = this.target.attr("radius");
    var arrowLength = this.attr("width") * 3;
    
    var Sx = this.source.getX(),
        Sy = this.source.getY(),
        Tx = this.target.getX(),
        Ty = this.target.getY();
    
    
    if(this.hasSourceArrow()) sourceOffset += arrowLength;
    if(this.hasTargetArrow()) targetOffset += arrowLength;
    
    var offset = getOffsetCoordinate(Sx, Sy, Tx, Ty, sourceOffset, targetOffset);
    
    if(this.hasSourceArrow()){
        Sx = offset.Sx;
        Sy = offset.Sy;
    }
    if(this.hasTargetArrow()){
        Tx = offset.Tx;
        Ty = offset.Ty;
    }
    
    if(forText){
        Sx = offset.Sx;
        Sy = offset.Sy;
        Tx = offset.Tx;
        Ty = offset.Ty;
    }
    
    return {
        Sx: Sx,
        Sy: Sy,
        Tx: Tx,
        Ty: Ty
    };
}

function changeSource(source){
    if(source instanceof Node) this.source = source;
    
    this.graph.delayRender(this);
    
    return this;
}

function changeTarget(target){
    if(target instanceof Node) this.target = target;
    
    this.graph.delayRender(this);
    
    return this;
}

function getSourceId(){
    return this.source.id;
}

function getTargetId(){
    return this.target.id;
}

var remove$1 = function (type) {
    delete this.graph._linksHash[this.id];
    this.graph._links.splice(this.graph._links.indexOf(this), 1);

    this.graph._render();
    
    if(this.mergedBy && (type !== LINK_REMOVE_TYPE.UNMERGE) ) this.mergedBy.remove();
    if(this.transformedBy && (type !== LINK_REMOVE_TYPE.L2N)) this.transformedBy.remove();

    return this;
};

var getHomoLinks = function () {
    return this.graph._links.filter(function(Link){
        return (Link.source === this.source || Link.source === this.target) &&
                (Link.target === this.source || Link.target === this.target);
    }, this) || [];
};

function Link(data, graph) {
    this.graph = graph;
    this.id = data.id;
    this.label = data.label || "";
    this.width = data.width || (graph && graph._config.linkWidth);
    this.color = data.color || (graph && graph._config.linkColor);
    this.icon = data.icon  || graph._config.icon;
    this.mugshot = data.mugshot || graph._config.mugshot;
    this.selected = data.selected || false;
    this.direction = data.direction === undefined? 1: data.direction;//0: none, 1: from, 2: to, 3 double
    this.disabled = data.disabled || false;
    this.hide = data.hide || false;

    this.source = graph && this.graph._nodesHash[data.src];
    this.target = graph && this.graph._nodesHash[data.dst];
    
    for (var prop in data) {
        if (data.hasOwnProperty(prop) && this[prop] === undefined) this[prop] = data[prop];
    }
}

Link.prototype = {
    constructor: Link,
    hasST: hasST,
    getCoordination: getCoordination,
    getStartArrow: getStartArrow,
    getEndArrow: getEndArrow,
    LineWidth: LineWidth,
    LineHeight: LineHeight,
    getLinkInfoTransform: getLinkInfoTransform,
    attr: attr,
    remove: remove$1,
    getSourceId: getSourceId,
    getTargetId: getTargetId,
    changeSource: changeSource,
    changeTarget: changeTarget,
    getHomoLinks: getHomoLinks,
    hasSourceArrow: function(){
        return this.attr("direction") === DIRECTION.D2S || this.attr("direction") === DIRECTION.DOUBLE;
    },
    hasTargetArrow: function(){
        return this.attr("direction") === DIRECTION.S2D || this.attr("direction") === DIRECTION.DOUBLE;
    }
};

/**
 * Created by lcx on 2016/11/1.
 * 利用canvas 画点 
 */
var drawCanvasNode = function (canvasObj) {
    var nodes = this.getRenderedNodes();
    // var context = canvasObj.context;
    //对node 进行分类 按颜色进行分类 不同的颜色画在不同的画布上，但是所有点的总共的颜色不宜过多 否则在点线多的情况下会影响整体效率
    var colorList = [];
    var nodeDepartList = [];
    var selectedNodeDepartList = [];
    var cache = [];
    var selectedNodes = this.getSelectedNodes();
    for(var j=0;j<nodes.length;j++){
        if(nodes[j].color){
            if(colorList.indexOf(nodes[j].color)<0){
                colorList.push(nodes[j].color);
                nodeDepartList.push([nodes[j]]);
                selectedNodeDepartList.push([]);
                var canvas = document.createElement('canvas');
                canvas.width = this.element.width;
                canvas.height = this.element.height;
                cache.push(canvas);
            }else{
                var index = colorList.indexOf(nodes[j].color);
                nodeDepartList[index].push(nodes[j]);
            }
        }else{
            if(colorList.indexOf(COLOR)<0){
                colorList.push(COLOR);
                nodeDepartList.push([nodes[j]]);
                selectedNodeDepartList.push([]);
                var canvas = document.createElement('canvas');
                canvas.width = this.element.width;
                canvas.height = this.element.height;
                cache.push(canvas);
            }else{
                var index = colorList.indexOf(COLOR);
                nodeDepartList[index].push(nodes[j]);
            }
        }

    }
    for(var l=0;l<selectedNodes.length;l++){
        if(selectedNodes[l].color){
            var index = colorList.indexOf(selectedNodes[l].color);
            selectedNodeDepartList[index].push(selectedNodes[l]);
        }else{
            var index = colorList.indexOf(COLOR);
            selectedNodeDepartList[index].push(selectedNodes[l]);
        }

    }

    for(var i=0;i<nodeDepartList.length;i++){
        var context = cache[i].getContext('2d');
        var selectedNodes = selectedNodeDepartList[i];
        var nodes = nodeDepartList[i];
        if(selectedNodeDepartList[i].length>0){
            //绘制选中状态的点
            context.beginPath();
            context.lineWidth=10;
            context.strokeStyle = '#f65565';
            context.fillStyle = colorList[i];
            for(var m=0;m<selectedNodes.length;m++){
                var Node = selectedNodes[m];
                var x = Node.getX();
                var y = Node.getY();
                var r = Node.radius;

                var radius =  Node.radius-5;
                context.moveTo(x, y);
                context.arc(x, y, radius, 0, 2 * Math.PI);
            }
            context.stroke();
            context.fill();

            //画字
            context.strokeWidth = 1;
            context.font="16px 微软雅黑";
            context.textAlign='left';
            context.textBaseline='hanging';
            for(var k=0;k<selectedNodes.length;k++){
                var Node = selectedNodes[k];
                var x = Node.getX();
                var y = Node.getY();
                var r = Node.radius;

                var radius =  Node.radius-5;
                var labelLength = context.measureText(Node.label).width+10;
                context.fillStyle='#f65565';
                context.fillRect(x+radius,y+radius,labelLength,20);

                context.fillStyle = '#555';
                var label = Node.label;
                context.fillText(label,x+r,y+r);

            }

        }

        context.beginPath();
        context.lineWidth=1;
        context.strokeStyle = colorList[i];
        context.fillStyle = colorList[i];
        for(var n=0;n<nodes.length;n++){
            var Node = nodes[n];
            if(!Node.attr('selected')){
                var x = Node.getX();
                var y = Node.getY();
                var r = Node.radius;


                var radius = Node.radius;
                context.fillStyle = Node.color;
                context.strokeStyle=Node.color;

                context.moveTo(x, y);

                context.arc(x, y, radius, 0, 2 * Math.PI);
            }

        }
        context.stroke();
        context.fill();

        context.strokeWidth = 1;
        context.font="16px 微软雅黑";
        context.textAlign='left';
        context.textBaseline='hanging';
        context.fillStyle = '#555';
        for(var a=0;a<selectedNodes.length;a++){
            var Node = nodes[a];
            var x = Node.getX();
            var y = Node.getY();
            var r = Node.radius;

            var label = '';
            if(Node.label.length>8){
                label = Node.label.slice(0,8)+'...';
            }else{
                label = Node.label;
            }
            context.fillText(label,x+r,y+r);

        }
    }

    this.nodesCache = cache;
    this.colorList = colorList;
    this.nodesDepartList = nodeDepartList;
    return this;










   /* //分开渲染，先渲染选中状态的node
    if(selectedNodes.length>0){
        context.beginPath();
        context.lineWidth=10;
        context.strokeStyle = '#f65565';
        for(var m=0;m<selectedNodes.length;m++){
            var Node = selectedNodes[m];
            var x = Node.getX();
            var y = Node.getY();
            var r = Node.radius;

            var radius =  Node.radius-5 ;
            context.fillStyle = Node.color;
            context.moveTo(x, y);
            context.arc(x, y, radius, 0, 2 * Math.PI);
        }
        context.stroke();
        context.fill();
    }

    //非选中状态node
    context.beginPath();
    context.lineWidth=1;
    for(var i=0;i<nodes.length;i++){
            var Node = nodes[i];
        if(!Node.attr('selected')){
            var x = Node.getX();
            var y = Node.getY();
            var r = Node.radius;


            var radius = Node.radius;
            context.fillStyle = Node.color;
            context.strokeStyle=Node.color;

            context.moveTo(x, y);

            context.arc(x, y, radius, 0, 2 * Math.PI);
        }

            // context.restore();
    }
    context.stroke();
    context.fill();

//画字
    context.beginPath();
    for(var k=0;k<nodes.length;k++){
        var Node = nodes[k];
        var x = Node.getX();
        var y = Node.getY();
        var r = Node.radius;

        //在点的旁边写对应文字
        if(Node.selected){
            //有点选状态
            var labelLength = context.measureText(Node.label).width+10;
            context.fillStyle='#f65565';
            context.fillRect(x+radius,y+radius,labelLength,20);
        }
        context.strokeWidth = 1;
        context.fillStyle = '#555';
        context.font="16px 微软雅黑";
        context.textAlign='left';
        context.textBaseline='hanging';
        var label = '';
        if(Node.selected){
            label = Node.label;
        }else{
            if(Node.label.length>8){
                label = Node.label.slice(0,8)+'...';
            }else{
                label = Node.label;
            }
        }
        context.fillText(label,x+r,y+r);
    }*/

};

// import drawCanvasLink from './draw/drawCanvasLink2';
function clearNodes() {
    this._nodes = [];
}

function clearLinks() {
    this._links = [];
}

function hasNode(obj) {
    return Boolean(this._nodesHash[obj.id]);
}

function hasLink(obj) {
    return Boolean(this._linksHash[obj.id]);
}

function addNode(obj) {
    var node = new Node(obj, this);
    if(!this.hasNode(node)){
        this._nodesHash[node.id] = node;
        this._nodes.push(node);
    }
    return node;
}

function addLink(obj) {
    var link = new Link(obj, this);
    if(!this.hasLink(link) && link.hasST()){
        this._linksHash[link.id] = link;
        this._links.push(link);
    }
    
    return link;
}

function removeNodes(filter) {
    this.getNodes(filter).forEach(function(Node$$1){
        //remove links first
        this._removeLinksOfNode(Node$$1);
        Node$$1.remove();
    }, this);
    
    this._render();
}

function removeLinks(filter) {
    this.getLinks(filter).forEach(function(Link$$1){
        Link$$1.remove();
    }, this);
    
    this._render();
}

function removeLinksOfNode(Node$$1) {
    Node$$1.getConnectedLinks().map(function (Link$$1) {
        Link$$1.remove();
    }, this);
}

function nodes(nodes, cover) {
    nodes = toArray(nodes);

    if(!arguments.length) return this._nodes;
    if(cover) this.clearNodes();

    nodes.forEach(function(v){ this._addNode(v);},this);
    this._render();
    if(this.element.nodeName === 'CANVAS'){
        //初始化
        drawCanvasNode.call(this);
       /* var nodes = this.getRenderedNodes();
        var nodesCache = [];
        for(var i=0;i<nodes.length;i++){
            var tempCanvas = document.createElement('canvas');
            nodesCache.push(tempCanvas);
        }
        this.nodesCache = nodesCache;
        var canvasObj = {
            nodes:this.getRenderedNodes(),
            nodesCache:this.nodesCache
        };
        drawCanvasNode(canvasObj);*/
    }
    return this;
}

function links(links, cover) {
    links = toArray(links);
    
    if(!arguments.length) return this._links;
    if(cover) this.clearLinks();
    
    links.forEach(function(v){ this._addLink(v); },this);
    this._render();
    if(this.element.nodeName === 'CANVAS'){
        var canvas = document.createElement('canvas');
        canvas.width = this.element.width;
        canvas.height = this.element.height;
        this.linkCanvas = canvas;
       /* var links = this.getRenderedLinks();
        var nodes = this.getRenderedNodes();
        var linksCache = [];
        for(var j=0;j<links.length;j++){
            var tempCanvas = document.createElement('canvas');
            // var svg = document.createElement('svg');


            linksCache.push(tempCanvas);
        }*/
        // this.linksCache = [];
        /*var canvasObj = {
            links:this.getRenderedLinks(),
            linksCache:this.linksCache,
            cacheList:this.cacheList
        };*/
        // drawCanvasLink.call(this);
    }

    return this;
}

var getIds = function (array) {
    return array.map(function(item){
        if(typeof item  ===  'object') return item.id;
        else return item;
    });
};

//filter array of object which has id; filtered by id, or id array, or object that has id, or object array
//this function is convenient to Nodes or Links data.
var filterBy = function (filter, objArray) {
    if(typeof filter === "function"){
        var filtered = filter;
    }else if(filter === undefined || filter === null){
        filtered = function(){return true};
    }else{
        var ids = getIds(toArray(filter));

        filtered = function(v){
            return ids.indexOf(v.id) !== -1;
        };
    }
    
    var filteredArr = [];
    
    for(var i = 0; i < objArray.length; i++){
        if(filtered(objArray[i])) filteredArr.push(objArray[i]);
    }
    return filteredArr;
};

var attr$1 = function (prop, val) {
    this.arr.forEach(function(datum){
        datum.attr(prop, val instanceof Function? val(datum): val);
    });
    return this;
};

var data = function () {
    return this.arr;
};

function Selection(arr) {
    this.arr = arr;
}

Selection.prototype = {
    constructor: Selection,
    attr: attr$1,
    data: data
};

function getNodesOP(filter, val){
    return new Selection(this.getNodes(filter, val), this);
}

function getNodes(filter, val) {
    if(arguments.length === 2 && val !== undefined){
        var key = filter;
        filter = function(Node){return Node.attr(key) === val;};
    }
    return filterBy(filter, this._nodes);
}

function getRenderedNodes() {
    return this.getNodes(function(Node){
        return !Node.attr("hide");
    });
}

function getSelectedNodes() {
    return this.getNodes("selected", true);
}

function getLinksOP(filter, val){
    return new Selection(this.getLinks(filter, val));
}

function getLinks(filter, val) {
    if(arguments.length === 2 && val !== undefined){
        var key = filter;
        filter = function(Node){return Node.attr(key) === val;};
    }
    
    return filterBy(filter, this._links);
}

function getSelectedLinks() {
    return this.getLinks(function(Link){
        return Link.attr("selected");
    });
}

function getContainLinks(Nodes) {
    var ids = getIds(Nodes);
    var containedLinks = [];
    
    for(var i = this._links.length; i--;){
        var Link = this._links[i];
        if((ids.indexOf(Link.getSourceId()) !== -1) && (ids.indexOf(Link.getTargetId()) !== -1)){
            containedLinks.push(Link);
        }
    }
    return containedLinks;
}

function getAttachedLinks(Nodes) {
    var ids = getIds(Nodes);
    var links = this.getRenderedLinks();
    var attachedLinks = [];
    for(var i = links.length; i--;){
        var Link = links[i];
        if( (ids.indexOf(Link.getSourceId()) === -1 && ids.indexOf(Link.getTargetId()) !== -1) || (ids.indexOf(Link.getSourceId()) !== -1 && ids.indexOf(Link.getTargetId()) === -1) ){
            attachedLinks.push(Link);
        }
    }
    return attachedLinks;
}

function getRelatedLinks(Nodes) {
    return this.getContainLinks(Nodes).concat(this.getAttachedLinks(Nodes));
}

function getRenderedLinks() {
    return this.getLinks(function(Link){
        return !Link.attr("hide");
    });
}

var appendPreDefs = function () {
    var self = this;
    var str = '<defs>'+
                        '<filter id="shadow" x="-20%" y="-20%" width="200%" height="200%" type="Shadow" shadowoffsetx="5" shadowoffsety="5" shadowblur="5" shadowcolor="rgba(0,0,0)">' +
                            '<feOffset result="offOut" in="SourceGraphic" dx="0" dy="3"></feOffset>' +
                            '<feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"></feColorMatrix>' +
                            '<feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2"></feGaussianBlur>' +
                            '<feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend>' +
                        '</filter>' +
                        '<marker id="start-arrow" viewBox="0 -5 10 10" refX="10" markerWidth="3" markerHeight="3" orient="auto"><path d="M10,-5L0,0L10,5"></path></marker>' +
                        '<marker id="start-arrow-selected" viewBox="0 -5 10 10" refX="10" markerWidth="3" markerHeight="3" orient="auto"><path d="M10,-5L0,0L10,5"></path></marker>' +
                        '<marker id="end-arrow" viewBox="0 -5 10 10" refX="0" markerWidth="3" markerHeight="3" orient="auto"><path d="M0,-5L10,0L0,5"></path></marker>' +
                        '<marker id="end-arrow-selected" viewBox="0 -5 10 10" refX="0" markerWidth="3" markerHeight="3" orient="auto"><path d="M0,-5L10,0L0,5"></path></marker>' +
                        '<radialGradient id="linear" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">' +
                            '<stop offset="0%" style="stop-color:rgb(255，255,255);stop-opacity:0" />' +
                            '<stop offset="90%" style="stop-color:rgb(255,255,255);stop-opacity:1" />' +
                            '<stop offset="98%" style="stop-color:rgb(255,255,255);stop-opacity:1" />' +
                            '<stop offset="100%" style="stop-color:rgb(222，222, 222);stop-opacity:1" />' +
                        '</radialGradient>' +
                '</defs>';

    this.element.insertAdjacentHTML("afterbegin", str);
    
    d3.select("#start-arrow path").call(arrowAttr);
    d3.select("#end-arrow path").call(arrowAttr);
    
    function arrowAttr(selection){
        selection.style('fill', self._config.linkColor);
    }
};

var appendPreElement = function () {
    var svg = this.svgSelection();
    this._brushSelection = svg.append("g").attr("class", "brush");

    var forceGroup = this._forceGroupSelection = svg.append('g').attr('class', 'force');
    
    forceGroup.append("g").attr("class", "links");
    forceGroup.append("g").attr("class", "nodes");
};

var Zoom = function() {
    var self = this;
    return d3.zoom().scaleExtent([this._config.minScale, this._config.maxScale])
        .on('start', function () {
            self._config.onZoomStart.call(this);
        })
        .on("zoom", this._zoomed.bind(this))
        .on('end', function () {
            self._config.onZoomEnd.call(this);
        });
};

var Brush = function () {
    var self = this;
    var brush = d3.brush()
        .extent([[0, 0], [3840, 2400]])
        .on('start', function () {
            if (!d3.event.selection) return; // Ignore empty selections.
            
            self.nodesSelection().each(function (Node) {
                Node.pselected = d3.event.sourceEvent.ctrlKey && Node.attr("selected");
            });
            self._config.onBrushStart.call(this);
        })
        .on('brush', function () {
            if (!d3.event.selection) return; // Ignore empty selections.

            var extent = d3.event.selection;
            var t = self.currentTransform();

            self.nodesSelection().each(function(Node){
                Node.attr("selected", !Node.attr('disabled') && Boolean(Node.pselected ^ ( (extent[0][0] - t.x) / t.k  <= Node.getX() && Node.getX() < (extent[1][0] - t.x) / t.k  && (extent[0][1] - t.y) / t.k <= Node.getY() && Node.getY() < (extent[1][1] - t.y) / t.k )));
            });
            self._config.onBrush.call(this);
        })
        .on('end', function () {
            if (!d3.event.selection) return; // Ignore empty selections.
            self.brushSelection()
                .call(brush.move, null);
            self._config.onBrushEnd.call(this);
        });

    brush.show = function(){
        self.brushSelection().style('display', 'block');
    };
    brush.hide = function(){
        self.brushSelection().style('display', 'none');
    };

    return brush;
};

var dragNode = function () {
    var self = this;
    var drag = d3.drag()
        .on("start", function (Node) {
            d3.event.sourceEvent.stopPropagation();
        })
        .on("drag", this.draged.bind(this))
        .on("end", function (Node) {

        });
    return drag;
};

var init = function () {
    //init trigger only once a graph
    if(this._hasInit) return;

    var self = this;

    //add predefined DOM
    appendPreElement.call(this);
    appendPreDefs.call(this);


    this.svgSelection()
        .classed("graph", true)
        .style("background", this._config.background)
        .call(this._config.bindGraphEvent)
        .on("click.deselect", function () {
            if (d3.event.target.nodeName !== 'svg') return;
            self.getNodesOP().attr('selected', false);
            self.getLinksOP().attr('selected', false);
        }, true);

    //bind listener to page for keyboard shortCuts and mouse events
    d3.select(document.body)
        .on("keydown.brush", this._keydowned.bind(this))
        .on("keyup.brush", this._keyupped.bind(this));

    //add zoom instance to graph
    this.zoom = Zoom.call(this);
    this.svgSelection()
        .call(this.zoom);

    //add brush instance to graph
    this.brush = Brush.call(this);
    this.brushSelection()
        .call(this.brush);

    
    //new drag instance for bind to nodes
    this.dragNode = dragNode.call(this);

    this._hasInit = true;
};

/**
 * Created by lcx on 2016/11/1.
 * 利用canvas 画点 
 */
var drawCanvasNode$1 = function (canvasObj) {
    var nodes = canvasObj.nodes;
    // var context = canvasObj.context;

    console.log('drawCache');
    for(var i=0;i<nodes.length;i++){
        (function () {
            var Node = nodes[i];
            var x = Node.getX();
            var y = Node.getY();
            var r = Node.radius;

            var context = canvasObj.nodesCache[i].getContext('2d');
            canvasObj.nodesCache[i].width = r*2+context.measureText(Node.label).width+10;
            canvasObj.nodesCache[i].height = r*2+context.measureText(Node.label).width+10;
            context.save();
            // console.log(Node.selected());
            context.beginPath();
            var radius = Node.selected ? Node.radius-5 : Node.radius;
            context.fillStyle = Node.color;
            context.moveTo(r, r);
            if(Node.selected){
                context.strokeStyle = '#f65565';
                context.lineWidth=10;
            }else{
                context.strokeStyle=Node.color;
                context.lineWidth=1;
            }

            context.arc(r, r, radius, 0, 2 * Math.PI);
            context.stroke();
            context.fill();

            //画字
            //在点的旁边写对应文字
            
            context.beginPath();
            if(Node.selected){
                //有点选状态
                var labelLength = context.measureText(Node.label).width+10;
                context.fillStyle='#f65565';
                context.fillRect(r+radius,r+radius,labelLength,20);
            }
            context.strokeWidth = 1;
            context.fillStyle = '#555';
            context.font="16px 微软雅黑";
            context.textAlign='left';
            context.textBaseline='hanging';
            var label = '';
            if(Node.selected){
                label = Node.label;
            }else{
                if(Node.label.length>8){
                    label = Node.label.slice(0,8)+'...';
                }else{
                    label = Node.label;
                }
            }
            context.fillText(label,r+r,r+r);
            context.restore();
        })(i);
    }
  /*  nodes.forEach(function(Node,i) {


    });*/
};

/**
 * Created by lcx on 2016/11/2.
 */
var drawArrow = function(ctx,link,lineWidth,x,y) {
    var targetLink = false;//标记当前link 是否为点击选中的link
    var s1 = link.source.getX();
    var e1 = link.source.getY();
    var s2 = link.target.getX();
    var e2 = link.target.getY();
    var r ,r1;
    function draw(e1, s1, e2, s2,tag) {
        var l = Math.sqrt((s2-s1)*(s2-s1) + (e2-e1)*(e2-e1));
        var sin = (e2-e1)/l;
        var cos = (s2-s1)/l;

        var dx = (r+lineWidth)*cos;
        var dy = (r+lineWidth)*sin;

        var sdx = (r1+lineWidth)*cos;
        var sdy = (r1+lineWidth)*sin;
        var res = {
            tag:tag
        };

        var x2,y2,x1,y1;
        x2 = s2-dx;
        y2 = e2-dy;
        x1 = s1+sdx;
        y1 = e1+sdy;

        /*var arrX1,arrY1,arrX2,arrY2;
        arrX2 = s2-(r+lineWidth*3)*cos;
        arrY2 = e2-(r+lineWidth*3)*sin;
        arrX1 = s1+(r1+lineWidth*3)*cos;
        arrY1 = e1+(r1+lineWidth*3)*sin;*/
        var targetArrow = calcArrow(x1,y1,x2,y2);
        var sourceArrow = calcArrow(x2,y2,x1,y1);
        x1 = round(x1);
        x2 = round(x2);
        y1 = round(y1);
        y2 = round(y2);
        targetArrow.a1 = round(targetArrow.a1);
        targetArrow.b1 = round(targetArrow.b1);
        targetArrow.a2 = round(targetArrow.a2);
        targetArrow.b2 = round(targetArrow.b2);
        sourceArrow.a1 = round(sourceArrow.a1);
        sourceArrow.b1 = round(sourceArrow.b1);
        sourceArrow.a2 = round(sourceArrow.a2);
        sourceArrow.b2 = round(sourceArrow.b2);
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        if(tag == 'double'){
            ctx.moveTo(targetArrow.a1,targetArrow.b1);
            ctx.lineTo(x2,y2);
            ctx.lineTo(targetArrow.a2,targetArrow.b2);

            ctx.moveTo(sourceArrow.a1,sourceArrow.b1);
            ctx.lineTo(x1,y1);
            ctx.lineTo(sourceArrow.a2,sourceArrow.b2);
        }else if(tag == 'source'){
            var sourceArrow = calcArrow(x1,y1,x2,y2);
            sourceArrow.a1 = round(sourceArrow.a1);
            sourceArrow.b1 = round(sourceArrow.b1);
            sourceArrow.a2 = round(sourceArrow.a2);
            sourceArrow.b2 = round(sourceArrow.b2);
            ctx.moveTo(sourceArrow.a1,sourceArrow.b1);
            ctx.lineTo(x2,y2);
            ctx.lineTo(sourceArrow.a2,sourceArrow.b2);
        }else if(tag == 'target'){
            ctx.moveTo(targetArrow.a1,targetArrow.b1);
            ctx.lineTo(x2,y2);
            ctx.lineTo(targetArrow.a2,targetArrow.b2);
        }
        return res;
    }

    if(link.hasSourceArrow() && link.hasTargetArrow()){
        //双箭头
        r = link.target.radius;
        r1 = link.source.radius;
        return draw(e1,s1,e2,s2,'double');
    }else if(link.hasSourceArrow()){
        r = link.source.radius;
        r1 = link.target.radius;
        //箭头指向source
        return draw(e2,s2,e1,s1,'source');
    }else if(link.hasTargetArrow()){
        r = link.target.radius;
        r1 = link.source.radius;
        //箭头指向target
        return draw(e1,s1,e2,s2,'target');
    }else{
        r = link.target.radius;
        r1 = link.source.radius;
        return draw(e1,s1,e2,s2,'none');
    }

    function round(somenum) {
        var rounded;
        rounded = (0.5 + somenum) | 0;
        rounded = ~~ (0.5 + somenum);
        rounded = (0.5 + somenum) << 0;
        return rounded;
    }

    function calcArrow(x1, y1, x2, y2) {
        //进行箭头的绘制
        var angle = Math.abs(Math.atan((x2 - x1) / (y2 - y1))); //倾斜角余角
        var length = 10; //箭头斜线长度
        var degree = Math.PI / 6; //箭头倾斜角
        var theta = 0;
        var altha = 0;
        var a1 = 0;
        var b1 = 0;
        var a2 = 0;
        var b2 = 0;
        //a1，b1  求箭头的坐标

        if (angle >= degree && angle <= Math.PI / 2 - degree) {
            theta = angle - degree;
            altha = Math.PI / 2 - 2 * degree - theta;
            if (x2 >= x1) {
                a1 = x2 - length * Math.sin(theta);
                a2 = x2 - length * Math.cos(altha);
            } else {
                a1 = x2 + length * Math.sin(theta);
                a2 = x2 + length * Math.cos(altha);
            }
            if (y2 >= y1) {
                b1 = y2 - length * Math.cos(theta);
                b2 = y2 - length * Math.sin(altha);
            } else {
                b1 = y2 + length * Math.cos(theta);
                b2 = y2 + length * Math.sin(altha);
            }
        } else {
            theta = angle - degree;
            altha = theta + 2 * degree - Math.PI / 2;
            if (x2 >= x1 && y2 >= y1) {
                a1 = x2 - length * Math.sin(theta);
                b1 = y2 - length * Math.cos(theta);
                a2 = x2 - length * Math.cos(altha);
                b2 = y2 + length * Math.sin(altha);
            } else if (x2 >= x1 && y2 < y1) {
                a1 = x2 - length * Math.sin(theta);
                b1 = y2 + length * Math.cos(theta);
                a2 = x2 - length * Math.cos(altha);
                b2 = y2 - length * Math.sin(altha);
            } else if (x2 < x1 && y2 < y1) {
                a1 = x2 + length * Math.sin(theta);
                b1 = y2 + length * Math.cos(theta);
                a2 = x2 + length * Math.cos(altha);
                b2 = y2 - length * Math.sin(altha);
            } else {
                a1 = x2 + length * Math.sin(theta);
                b1 = y2 - length * Math.cos(theta);
                a2 = x2 + length * Math.cos(altha);
                b2 = y2 + length * Math.sin(altha);
            }
        }
        return {
            a1:a1,
            b1:b1,
            a2:a2,
            b2:b2
        };
    }


};

/**
 * Created by lcx on 2016/12/13.
 */

/**
 * Created by lcx on 2016/11/1.
 * 利用canvas 画线
 */
var drawLinkCanvas = function (canvasObj,tag,target) {
    //取得经过计算之后的links 数据
    var links = canvasObj.links;
    var nodes = canvasObj.nodes;
    var cacheCtx = canvasObj.context;
    var width = canvasObj.canvas.width;
    var height = canvasObj.canvas.height;

    //进行绘制
    // context.strokeStyle = "#ccc";
    var targetLink = null;
    // var lineList = [];
    // var pointList = [];
    var selectedLinks = this.getSelectedLinks();



    if(tag == 'dragStart'){
        var departLinks = getDepartLinks(links,target);
        var selectedDepart = getDepartLinks(selectedLinks,target);
        var targetLinks = departLinks.targetLinks;
        var otherLinks = departLinks.otherLinks;
        var selectedTargetLinks = selectedDepart.targetLinks;
        var selectedOtherLinks = selectedDepart.otherLinks;
        //drag 操作，需要分成两张画布进行渲染  和target 相连的线+target 单独绘制在一张画布上面
        var targetCanvas = document.createElement('canvas');
        targetCanvas.width = width;
        targetCanvas.height = height;
        var targetContext = targetCanvas.getContext('2d');
        targetContext.save();

        targetContext.translate(canvasObj.transform.x, canvasObj.transform.y);
        targetContext.scale(canvasObj.transform.k, canvasObj.transform.k);

        var otherCanvas = document.createElement('canvas');
        otherCanvas.width = canvasObj.canvas.width;
        otherCanvas.height = canvasObj.canvas.height;
        var otherContext = otherCanvas.getContext('2d');
        otherContext.save();

        otherContext.translate(canvasObj.transform.x, canvasObj.transform.y);
        otherContext.scale(canvasObj.transform.k, canvasObj.transform.k);





        //先绘制其他
        otherContext.lineWidth=3;
        if(selectedOtherLinks.length>0){
            otherContext.beginPath();
            otherContext.strokeStyle = '#f00';
            for(var m=0;m<selectedOtherLinks.length;m++){

                drawArrow(otherContext,selectedOtherLinks[m],3);
            }
            otherContext.stroke();
        }

        otherContext.beginPath();
        otherContext.strokeStyle = '#ccc';
        //画线
        for(var i=0;i<otherLinks.length;i++){
            if(!otherLinks[i].attr('selected')){
                drawArrow(otherContext,otherLinks[i],3);
            }
            var text = otherLinks[i].label;

            var s1 = otherLinks[i].source.getX();
            var e1 =otherLinks[i].source.getY();
            var s2 = otherLinks[i].target.getX();
            var e2 = otherLinks[i].target.getY();


            otherContext.fillText(text,(s2+s1)/2,(e2+e1)/2);
        }
        otherContext.stroke();
      /*  for(var k=0;k<nodes.length;k++){
            if(nodes[k].id != target.id){
                otherContext.drawImage(canvasObj.nodesCache[k],nodes[k].getX()-nodes[k].radius,nodes[k].getY()-nodes[k].radius);
            }
        }*/


        otherContext.restore();


        //绘制拖拽选中的link-----------------------------------
        targetContext.lineWidth=3;
        if(selectedTargetLinks.length>0){
            targetContext.beginPath();
            targetContext.strokeStyle = '#f00';
            for(var m=0;m<selectedTargetLinks.length;m++){

                drawArrow(targetContext,selectedTargetLinks[m],3);
            }
            targetContext.stroke();
        }

        targetContext.beginPath();
        targetContext.strokeStyle = '#ccc';
        //画线
        for(var i=0;i<targetLinks.length;i++){
            if(!targetLinks[i].attr('selected')){
               drawArrow(targetContext,targetLinks[i],3);
            }
            var text = targetLinks[i].label;

            var s1 = targetLinks[i].source.getX();
            var e1 =targetLinks[i].source.getY();
            var s2 = targetLinks[i].target.getX();
            var e2 = targetLinks[i].target.getY();


            targetContext.fillText(text,(s2+s1)/2,(e2+e1)/2);
        }
        targetContext.stroke();
        // for(var n=0;n<nodes.length;n++){
        //     if(nodes[n].id == target.id){
        //         targetContext.drawImage(canvasObj.nodesCache[n],nodes[n].getX()-nodes[n].radius,nodes[n].getY()-nodes[n].radius);
        //     }
        // }
        targetContext.restore();

        cacheCtx.drawImage(otherCanvas,0,0);
        cacheCtx.drawImage(targetCanvas,0,0);

        return {
            otherCanvas:otherCanvas,
            targetCanvas:targetCanvas
        };

    }else if(tag == 'drag'){
        var departLinks = getDepartLinks(links,target);
        var selectedDepart = getDepartLinks(selectedLinks,target);
        var targetLinks = departLinks.targetLinks;
        var otherLinks = departLinks.otherLinks;
        var selectedTargetLinks = selectedDepart.targetLinks;
        var selectedOtherLinks = selectedDepart.otherLinks;

        var otherCanvas = canvasObj.doubleCanvas.otherCanvas;
        var targetCanvas = canvasObj.doubleCanvas.targetCanvas;
        var targetContext = targetCanvas.getContext('2d');
        targetContext.save();
        targetContext.clearRect(0,0,width,height);
        targetContext.translate(canvasObj.transform.x, canvasObj.transform.y);
        targetContext.scale(canvasObj.transform.k, canvasObj.transform.k);


        targetContext.lineWidth=3;
        if(selectedTargetLinks.length>0){
            targetContext.beginPath();
            targetContext.strokeStyle = '#f00';
            for(var m=0;m<selectedTargetLinks.length;m++){

                drawArrow(targetContext,selectedTargetLinks[m],3);
            }
            targetContext.stroke();
        }

        targetContext.beginPath();
        targetContext.strokeStyle = '#ccc';
        //画线
        for(var i=0;i<targetLinks.length;i++){
            if(!targetLinks[i].attr('selected')){
                drawArrow(targetContext,targetLinks[i],3);
            }
            var text = targetLinks[i].label;

            var s1 = targetLinks[i].source.getX();
            var e1 =targetLinks[i].source.getY();
            var s2 = targetLinks[i].target.getX();
            var e2 = targetLinks[i].target.getY();


            targetContext.fillText(text,(s2+s1)/2,(e2+e1)/2);
        }
        targetContext.stroke();
       /* for(var j=0;j<nodes.length;j++){
            if(nodes[j].id == target.id){
                targetContext.drawImage(canvasObj.nodesCache[j],nodes[j].getX()-nodes[j].radius,nodes[j].getY()-nodes[j].radius);
            }
        }*/
        targetContext.restore();
        cacheCtx.drawImage(otherCanvas,0,0);
        cacheCtx.drawImage(targetCanvas,0,0);
        canvasObj.doubleCanvas.targetCanvas = targetCanvas;
        return canvasObj.doubleCanvas;
    }else{
        //无区别重绘
        var context = this.linkCanvas.getContext('2d');
        context.clearRect(0,0,this.element.width,this.element.height);
        context.save();
        context.translate(canvasObj.transform.x, canvasObj.transform.y);
        context.scale(canvasObj.transform.k, canvasObj.transform.k);

        context.lineWidth=3;
        if(selectedLinks.length>0){
            context.beginPath();
            context.strokeStyle = '#f00';
            for(var m=0;m<selectedLinks.length;m++){

               drawArrow(context,selectedLinks[m],3);
            }
            context.stroke();

        }


        context.beginPath();
        context.strokeStyle = '#ccc';
        //画线
        for(var i=0;i<links.length;i++){
            if(!links[i].attr('selected')){
                drawArrow(context,links[i],3);
            }
        }
        context.stroke();
        if(canvasObj.transform.k>=1){
            context.strokeWidth = 0;
            context.fillStyle = '#555';
            context.font="16px 微软雅黑";
            for(var k=0;k<links.length;k++){
                var text = links[k].label;

                var s1 = links[k].source.getX();
                var e1 = links[k].source.getY();
                var s2 = links[k].target.getX();
                var e2 = links[k].target.getY();


                context.fillText(text,(s2+s1)/2,(e2+e1)/2);
            }
        }

        context.restore();
        cacheCtx.drawImage(this.linkCanvas,0,0);

        /*cacheCtx.beginPath();
         cacheCtx.fillStyle = '#ccc';
         //画三角形
         for(var j=selectedLinks.length;j<lineList.length;j++){
         var tag = pointList[j].tag;
         lineList[j].drawArrowhead(cacheCtx,tag);
         }
         cacheCtx.fill();*/
        //画文字

        return targetLink;


    }





    // var selectedLinks = this.getSelectedLinks();


    function getDepartLinks(links, target) {
        var targetList = [];
        var otherList = [];
        for(var i=0;i<links.length;i++){
            if(links[i].source.id == target.id || links[i].target.id == target.id){
                targetList.push(links[i]);
            }else{
                otherList.push(links[i]);
            }
        }
        return {
            targetLinks:targetList,
            otherLinks:otherList
        }
    }

};

/**
 * Created by lcx on 2016/12/8.
 */
var initCache = function () {
    if(this._hasInit) return;

    var that = this;
    var nodes = that.getRenderedNodes();
    var links = that.getRenderedLinks();
    var nodesCache = [],linksCache = [];
console.log(links);
    console.log(nodes);
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
    console.log(linksCache);
    console.log('initCache');
    drawLinkCanvas(canvasObj);
    drawCanvasNode$1(canvasObj);
    this._hasInit = true;

};

var getAbsUrl = function (url) {
    return (url || window.location.href).split('#')[0];
};

var drawNodesSvg = function (renderType) {
 
    var self = this;
    var nodes = this.nodesSelection().data(this.getRenderedNodes(), function (Node) { return Node.id;});

    var g = nodes.enter().append('g')
        .each(function(Node){ Node.element = this; })//reference element to Node
        .classed('node', true)
        .on('mousedown.select', function(Node, i){
            if(!d3.event.ctrlKey){
                if(Node.attr("selected")) return;
                self.getNodesOP().attr("selected", false);
            }
            self.getLinksOP().attr("selected", false);
            Node.attr("selected",!Node.attr("selected"));
        })
        .call(this._config.bindNodeEvent)
        .call(this.dragNode);

    //添加矩形
    g.append("circle")
        .attr("filter", "url(" + getAbsUrl() + "#shadow)");
    g.append('svg:foreignObject')
        .attr('class', 'text-group')
        .append("xhtml:div")
        .append('xhtml:span');
    g.append('svg:foreignObject')
        .attr('class', 'icon')
        .append('xhtml:span');
    g.append('svg:foreignObject')
        .attr('class', 'mugshot')
        .append('xhtml:img');
    g.call(updateAttr);
    
    //need update Nodes Element
    if(renderType === RENDER_TYPE.IMMEDIATELY){
        var updateNodes = this.nodesSelection();
    }else{
        updateNodes = d3.selectAll(this.updateDOM.getNodesEle());
    }
    updateNodes.call(updateAttr);
    
    this.updateDOM.clearUpdateNodes();
    
    nodes.exit().remove();
    
    function updateAttr(selection){
        var scale = self.currentTransform().k;
        selection.attr("transform", function (Node) { return "translate(" + Node.getX() + "," + Node.getY() + ")";})
            .classed("selected", function(Node){return Node.attr("selected")})
            .classed("disabled", function(Node){return Node.attr("disabled")});
        
        selection.select('circle')
            .attr("r", function(Node){ return Node.attr("radius");})
            .style("fill", function(Node){ return Node.attr("color"); });
        
        selection.selectAll('.icon, .mugshot')
            .attr("transform", function(Node){ return "translate(" + -Node.attr("radius") + ", "+ -Node.attr("radius") +")"; })
            .attr("width", function(Node){return Node.attr("radius")*2;})
            .attr("height", function(Node){return Node.attr("radius")*2;});
        
        selection.select('.icon').select('span')
            .attr('class', function(Node){ return self._config.iconPrefix + Node.attr("icon");})
            .style("line-height", function(Node){return Node.attr("radius")*2 + "px";});
        selection.select('.mugshot').select('img')
            .attr('src', function(Node){return Node.attr("mugshot")? self._config.mugshotPrefix + Node.attr("mugshot"): "";})
            .style('display', function(Node){return Node.attr("mugshot")? "block": "none";});
        
        selection.select('.text-group')
            .style('display', function(Node){
                return (scale < self._config.scaleOfHideNodeLabel)? 'none': 'block';
            })
            .attr('width', function (Node) { return Node.getLabelWidth(); })
            .attr("height", function(Node){ return Node.attr("radius") * scale; })
            .style("line-height", function(Node){ return Node.attr("radius") * scale + "px"; })
            .attr("transform", function(Node){ return "translate(" + (1 + Node.attr("radius")) + ", "+ (-Node.attr("radius") / 2) +") scale(" + 1 / scale + ")"; })
            
            .select('div')
            .style("width", self._config.nodeLabelClipWidth + "px")
            .attr('title', function (Node) { return Node.attr("label"); })
            .select('span')
            .text(function (Node) { return Node.attr("label"); });
    }
};

var unique = function (array) {
    var n = [];
    for (var i = 0; i < array.length; i++) {
        if (n.indexOf(array[i]) == -1) n.push(array[i]);
    }
    return n;
};

var drawLinksSvg = function (renderType) {
    var self = this;
    var scale = self.currentTransform().k;
    
    addArrowByColor();
    
    var links = this.linksSelection().data(this.getRenderedLinks(), function (Link) { return Link.id });

    var link = links.enter()
        .append('g')
        .each(function(Link){ Link.element = this; })
        .classed('link', true)
        .call(this._config.bindLinkEvent);
    
    link.append('path')
        .classed('link-path', true)
        .attr('id', function(Link){ return "link-path" + Link.id});
    
    
    var info = link
        .append('svg:foreignObject')
        .classed('link-info', true)
        .append("xhtml:div")
        .classed('center', true);
    
    info.append('xhtml:span').attr('class', 'icon');
    info.append('xhtml:span').attr('class', 'text');
    
    
    link.call(updateLinkAttr);
    
    
    if(renderType === RENDER_TYPE.IMMEDIATELY){
        var updateLinks  = this.linksSelection();
    }else if(renderType === RENDER_TYPE.NUDGE){
        updateLinks  = d3.selectAll(this.getRelatedLinks(this.getSelectedNodes()).map(function(Link){return Link.element;}));
    }else{
        updateLinks = d3.selectAll(this.updateDOM.getLinksEle());
    }
    
    
    updateLinks.call(updateLinkAttr);
    
    this.updateDOM.clearUpdateLinks();
    
    links.exit().remove();
    
    function updateLinkAttr(selection){
        // if(renderType === RENDER_TYPE.NUDGE){
        //     selection
        //         .select('path')
        //         .attr('d', function (Link) { var c = Link.getCoordination();  return 'M ' + c.Sx + ' ' + c.Sy + ' L ' + c.Tx + ' ' + c.Ty; });
        //     return;
        // }
        selection.classed("disabled", function(Link){return Link.attr("disabled")});
        
        selection
            .select('path')
            .attr('d', function (Link) { var c = Link.getCoordination();  return 'M ' + c.Sx + ' ' + c.Sy + ' L ' + c.Tx + ' ' + c.Ty; })
            .classed("selected", function(Link){return Link.attr("selected")})
            .style('marker-start', function (Link) { return Link.getStartArrow(); })
            .style('marker-end', function (Link) { return Link.getEndArrow(); })
            .style('stroke-width', function(Link){ return Link.attr("width"); })
            .style('stroke', function(Link){ return Link.attr("color"); });
    
        // if(renderType === RENDER_TYPE.NUDGE){
        //     selection
        //         .attr('dx', function(Link){return Link.getTextOffset(); })
        //         .attr('transform', function(Link){ return Link.getLinkLabelTransform(scale); });
        //     return;
        // }
        
        var info = selection
            .select('.link-info')
            .attr('transform', function(Link){
                return Link.getLinkInfoTransform(scale);
            })
            .style('display', function(Link){
                return (scale < self._config.scaleOfHideLinkLabel)? 'none': 'block';
            })
            .attr('width', function (Link) {return Link.LineWidth(scale)})
            .attr('height', function(Link){return Link.LineHeight(scale)});
        
        info.select('.text')
            .text(function (Link) {return Link.attr("label");});
    
        info.select('.icon')
            .attr('class', function(Link){ return self._config.iconPrefix + Link.attr("icon");});
    }
    
    function addArrowByColor(){
        var uniqueColor = unique(self.getRenderedLinks().map(function(Link){return Link.color;}));
        var startArrow = self.svgSelection().select('defs').selectAll('marker.color-start-arrow').data(uniqueColor, function(v){return v;});
        var endArrow = self.svgSelection().select('defs').selectAll('marker.color-end-arrow').data(uniqueColor, function(v){return v;});
    
        startArrow.enter()
            .append("svg:marker")
            .attr("id", function(v){ return "start-arrow-"+ v; })
            .classed('color-start-arrow', true)
            .attr("refX", 10)
            .call(arrowAttr)
            .append("svg:path")
            .attr("d", "M10,-5L0,0L10,5")
            .call(arrowPathAttr);
    
        endArrow.enter()
            .append("svg:marker")
            .attr("id", function(v){ return "end-arrow-"+ v; })
            .attr("refX", 0)
            .classed('color-end-arrow', true)
            .call(arrowAttr)
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5")
            .call(arrowPathAttr);
    
        function arrowAttr(selection){
            selection
                .attr("viewBox", "0 -5 10 10")
                .attr("markerWidth", 3)
                .attr("markerHeight", 3)
                .attr("orient", "auto");
        }
        function arrowPathAttr(selection){
            selection
                .style("fill", function(v){return v});
        }
    }
};

function findPoint(nodes,x, y) {
    var i,

        x = x,
        y = y,
        dx,
        dy;

    // var nodes = this.getRenderedNodes();

    for (i = nodes.length - 1; i >= 0; --i) {
        var r = nodes[i].radius;
        var point = nodes[i];
        var xx = point.x;
        var yy = point.y;

        // var xx = transform.applyX(point.x);
        // var yy = transform.applyY(point.y);

        dx = x - xx;
        dy = y - yy;
        if (dx * dx + dy * dy < r*r) {
            return point;
        }
    }
}

/**
 * Created by lcx on 2016/11/1.
 */
var convertToCanvasCor = function(canvas,x, y) {
    // var canvas = this._canvas;
    var res = {};
    var cBox = canvas.getBoundingClientRect();
    var cx = cBox.left;
    var cy = cBox.top;
    res.x = x - cx;
    res.y = y - cy;
    return res;
};

/**
 * Created by lcx on 2016/11/7.
 */
var findLinks = function (canvasObj, x, y,lineWidth) {
    // console.log(links);
    var context = canvasObj.context;
    var target = null;
    var targets = [];
    var lineWidth = lineWidth || 10;
    //判断是否选中线 采用计算的方法，不使用isPointInPath 方法
    var links = canvasObj.links;
    for(var i=0;i<links.length;i++){
        var point = drawArrow(links[i],3,x,y);
        if(calc(point,x,y)){
            target = links[i];
            // targets.push(links[i]);
        }
    }

    return target;

    function calc(point,x,y) {
        //判断点击的点是否在该线的区域内
        var minx = Math.min.apply(null,[point.x1,point.x2]);
        var maxx = Math.max.apply(null,[point.x1,point.x2]);
        var miny = Math.min.apply(null,[point.y1,point.y2]);
        var maxy = Math.max.apply(null,[point.y1,point.y2]);
        if(isInArea(x,minx,maxx) && isInArea(y,miny,maxy)){
            if(point.x1-point.x2==0 || point.y1-point.y2 == 0){
                //垂直 或 水平
                return true;
            }
            var dy = (y-point.y1)/(x-point.x1)*(point.x2-point.x1)-(point.y2-point.y1);
            var dx = (x-point.x1)/(y-point.y1)*(point.y2-point.y1)-(point.x2-point.x1);
            var targetLink = false;
            if(dy>=-lineWidth && dy <= lineWidth){
                targetLink = true;
            }else if(dx>=-lineWidth && dx <= lineWidth){
                targetLink = true;
            }
            return targetLink;
        }else{
            return false;
        }



    }
    
    function isInArea(x,minx,maxx) {
        var x1 = x-5;
        var x2 = x+5;
        if(minx == maxx){
            return true;
        }

        if(x>=minx && x<=maxx){
            return true;
        }else if(x1>=minx && x1<=maxx){
            return true;
        }else if(x2>=minx && x2<=maxx){
            return true;
        }else{
            return false;
        }
    }












  /*  function render(x,y) {
        context.clearRect(0, 0, canvasObj.canvas.width, canvasObj.canvas.height);
        context.save();
        context.translate(canvasObj.transform.x, canvasObj.transform.y);
        context.scale(canvasObj.transform.k, canvasObj.transform.k);
        target = drawCanvasLink(canvasObj,x,y);
        drawCanvasNode(canvasObj);
        context.restore();
    }
    render(x,y);
    return target;*/

};

/**
 * Created by lcx on 2016/12/8.
 */
var drawCache = function (canvasObj,keyWord,target) {
    var cache = this.nodesCache;
    var context = this.element.getContext('2d');
    for(var i=0;i<cache.length;i++){
        context.drawImage(cache[i],0,0);
    }

};

/**
 * Created by lcx on 2016/11/1.
 * 利用canvas 画点 
 */
var redrawNodeCanvas = function (canvasObj,target) {
    var nodes = this.getRenderedNodes();
    // var context = canvasObj.context;
    //对node 进行分类 按颜色进行分类 不同的颜色画在不同的画布上，但是所有点的总共的颜色不宜过多 否则在点线多的情况下会影响整体效率
    var colorList = this.colorList;
    var nodeDepartList = this.nodesDepartList;
    var selectedNodeDepartList = [];
    var cache = this.nodesCache;
    var selectedNodes = this.getSelectedNodes();
    colorList.forEach(function () {
        selectedNodeDepartList.push([]);
    });

    for(var l=0;l<selectedNodes.length;l++){
        if(selectedNodes[l].color){
            var index = colorList.indexOf(selectedNodes[l].color);
            selectedNodeDepartList[index].push(selectedNodes[l]);
        }else{
            var index = colorList.indexOf(COLOR$1);
            selectedNodeDepartList[index].push(selectedNodes[l]);
        }

    }

    if(target){
        //drag 操作，渲染某一张canvas 即可
        var index = 0;
        if(target.color){
            index = colorList.indexOf(target.color);
        }else{
            index = colorList.indexOf(COLOR$1);
        }
        var context = cache[index].getContext('2d');
        context.clearRect(0,0,this.element.width,this.element.height);
        context.save();
        context.translate(canvasObj.transform.x, canvasObj.transform.y);
        context.scale(canvasObj.transform.k, canvasObj.transform.k);
        var selectedNodes = selectedNodeDepartList[index];
        var nodes = nodeDepartList[index];
        if(selectedNodeDepartList[index].length>0){
            //绘制选中状态的点
            context.beginPath();
            context.lineWidth=10;
            context.strokeStyle = '#f65565';
            context.fillStyle = colorList[i];
            for(var m=0;m<selectedNodes.length;m++){
                var Node = selectedNodes[m];
                var x = Node.getX();
                var y = Node.getY();
                var r = Node.radius;

                var radius =  Node.radius-5;
                context.moveTo(x, y);
                context.arc(x, y, radius, 0, 2 * Math.PI);
            }
            context.stroke();
            context.fill();

            if(canvasObj.transform.k>=1){
//画字
                context.beginPath();
                context.strokeWidth = 1;
                context.font="16px 微软雅黑";
                context.textAlign='left';
                context.textBaseline='hanging';
                for(var k=0;k<selectedNodes.length;k++){
                    var Node = selectedNodes[k];
                    var x = Node.getX();
                    var y = Node.getY();
                    var r = Node.radius;

                    var radius =  Node.radius-5;
                    var labelLength = context.measureText(Node.label).width+10;
                    context.fillStyle='#f65565';
                    context.fillRect(x+radius,y+radius,labelLength,20);

                    context.fillStyle = '#555';
                    var label = Node.label;
                    context.fillText(label,x+r,y+r);

                }
            }


        }

        context.beginPath();
        context.lineWidth=1;
        context.strokeStyle = colorList[i];
        context.fillStyle = colorList[i];
        for(var n=0;n<nodes.length;n++){
            var Node = nodes[n];
            if(!Node.attr('selected')){
                var x = Node.getX();
                var y = Node.getY();
                var r = Node.radius;


                var radius = Node.radius;
                context.fillStyle = Node.color;
                context.strokeStyle=Node.color;

                context.moveTo(x, y);

                context.arc(x, y, radius, 0, 2 * Math.PI);
            }

        }
        context.stroke();
        context.fill();
        if(canvasObj.transform.k>=1) {
            context.beginPath();
            context.strokeWidth = 1;
            context.font="16px 微软雅黑";
            context.textAlign='left';
            context.textBaseline='hanging';
            context.fillStyle = '#555';
            for(var a=0;a<nodes.length;a++){
                var Node = nodes[a];
                var x = Node.getX();
                var y = Node.getY();
                var r = Node.radius;

                var label = '';
                if(Node.label.length>8){
                    label = Node.label.slice(0,8)+'...';
                }else{
                    label = Node.label;
                }
                context.fillText(label,x+r,y+r);

            }
        }

        context.restore();
    }else{
        //zoom 操作，需要全部重新渲染
        for(var i=0;i<nodeDepartList.length;i++){
            var context = cache[i].getContext('2d');
            context.clearRect(0,0,this.element.width,this.element.height);
            context.save();
            context.translate(canvasObj.transform.x, canvasObj.transform.y);
            context.scale(canvasObj.transform.k, canvasObj.transform.k);
            var selectedNodes = selectedNodeDepartList[i];
            var nodes = nodeDepartList[i];
            if(selectedNodeDepartList[i].length>0){
                //绘制选中状态的点
                context.beginPath();
                context.lineWidth=10;
                context.strokeStyle = '#f65565';
                context.fillStyle = colorList[i];
                for(var m=0;m<selectedNodes.length;m++){
                    var Node = selectedNodes[m];
                    var x = Node.getX();
                    var y = Node.getY();
                    var r = Node.radius;

                    var radius =  Node.radius-5;
                    context.moveTo(x, y);
                    context.arc(x, y, radius, 0, 2 * Math.PI);
                }
                context.stroke();
                context.fill();

                if(canvasObj.transform.k>=1){
//画字
                    context.strokeWidth = 1;
                    context.font="16px 微软雅黑";
                    context.textAlign='left';
                    context.textBaseline='hanging';
                    for(var k=0;k<selectedNodes.length;k++){
                        var Node = selectedNodes[k];
                        var x = Node.getX();
                        var y = Node.getY();
                        var r = Node.radius;

                        var radius =  Node.radius-5;
                        var labelLength = context.measureText(Node.label).width+10;
                        context.fillStyle='#f65565';
                        context.fillRect(x+radius,y+radius,labelLength,20);

                        context.fillStyle = '#555';
                        var label = Node.label;
                        context.fillText(label,x+r,y+r);

                    }
                }


            }

            context.beginPath();
            context.lineWidth=1;
            context.strokeStyle = colorList[i];
            context.fillStyle = colorList[i];
            for(var n=0;n<nodes.length;n++){
                var Node = nodes[n];
                if(!Node.attr('selected')){
                    var x = Node.getX();
                    var y = Node.getY();
                    var r = Node.radius;


                    var radius = Node.radius;
                    context.fillStyle = Node.color;
                    context.strokeStyle=Node.color;

                    context.moveTo(x, y);

                    context.arc(x, y, radius, 0, 2 * Math.PI);
                }

            }
            context.stroke();
            context.fill();
            if(canvasObj.transform.k>=1) {
                context.beginPath();
                context.strokeWidth = 1;
                context.font="14px 微软雅黑";
                context.textAlign='left';
                context.textBaseline='hanging';
                context.fillStyle = '#555';
                for(var a=0;a<nodes.length;a++){
                    var Node = nodes[a];
                    var x = Node.getX();
                    var y = Node.getY();
                    var r = Node.radius;

                    var label = '';
                    var icon = FONT[nodes[a].icon];
                    console.log(icon);
                    if(Node.label.length>8){
                        label = Node.label.slice(0,8)+'...';
                    }else{
                        label = Node.label;
                    }
                    context.fillText(label,x+r,y+r);

                    context.font="14px fontawesome";
                    context.fillText(String.fromCharCode(parseInt(icon,16)),x,y);


                }
            }

            context.restore();
        }
    }






    this.nodesCache = cache;
    this.colorList = colorList;
    return this;










   /* //分开渲染，先渲染选中状态的node
    if(selectedNodes.length>0){
        context.beginPath();
        context.lineWidth=10;
        context.strokeStyle = '#f65565';
        for(var m=0;m<selectedNodes.length;m++){
            var Node = selectedNodes[m];
            var x = Node.getX();
            var y = Node.getY();
            var r = Node.radius;

            var radius =  Node.radius-5 ;
            context.fillStyle = Node.color;
            context.moveTo(x, y);
            context.arc(x, y, radius, 0, 2 * Math.PI);
        }
        context.stroke();
        context.fill();
    }

    //非选中状态node
    context.beginPath();
    context.lineWidth=1;
    for(var i=0;i<nodes.length;i++){
            var Node = nodes[i];
        if(!Node.attr('selected')){
            var x = Node.getX();
            var y = Node.getY();
            var r = Node.radius;


            var radius = Node.radius;
            context.fillStyle = Node.color;
            context.strokeStyle=Node.color;

            context.moveTo(x, y);

            context.arc(x, y, radius, 0, 2 * Math.PI);
        }

            // context.restore();
    }
    context.stroke();
    context.fill();

//画字
    context.beginPath();
    for(var k=0;k<nodes.length;k++){
        var Node = nodes[k];
        var x = Node.getX();
        var y = Node.getY();
        var r = Node.radius;

        //在点的旁边写对应文字
        if(Node.selected){
            //有点选状态
            var labelLength = context.measureText(Node.label).width+10;
            context.fillStyle='#f65565';
            context.fillRect(x+radius,y+radius,labelLength,20);
        }
        context.strokeWidth = 1;
        context.fillStyle = '#555';
        context.font="16px 微软雅黑";
        context.textAlign='left';
        context.textBaseline='hanging';
        var label = '';
        if(Node.selected){
            label = Node.label;
        }else{
            if(Node.label.length>8){
                label = Node.label.slice(0,8)+'...';
            }else{
                label = Node.label;
            }
        }
        context.fillText(label,x+r,y+r);
    }*/

};

var drawCanvas = function () {
    var that = this;
    var context = this.element.getContext("2d");
    // console.log(that._getCurrentTransform());
    //绘制的canvas 对象，在优化的时候可以对nodes 和 links 的数据进行相应的分组优化

    var canvas = {
        canvas:that.element,
        context:context,
        nodes:this.getRenderedNodes(),
        links:this.getRenderedLinks(),
        transform:that.currentTransform(),
        nodesCache:that.nodesCache,//离屏缓存canvas
        linksCache:that.linksCache,
        zoomCache:null

    };

    // d3.json('../src/graph/canvas/font-awesome-data.json',function (data) {
    //     console.log(data);
    //     canvas.fontAwesome = data;
    // });

    var nodeCanvas = document.createElement('canvas');
    nodeCanvas.width = that.element.width;
    nodeCanvas.height = that.element.height;
    canvas.nodeCanvas = nodeCanvas;

    //进行事件绑定，canvas 在进行事件绑定的时候没有对应的dom 结构，所以要进行相应的计算来判断事件的目标对象时哪个点或者边
    render();
    //绘制
    //canvas 事件绑定
    d3.select(this.element)
        // .on('mousedown',_click)
        // .on('click',_click)
        .on('dblclick',_dblClick)
        .on('mousemove',_mousemove)
        .call(d3.drag()
            .container(that.element)
            .subject(dragsubject)
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .call( d3.zoom().scaleExtent([0.5, 8])
            .on('zoom', zoomed)
            .on('end',function () {
                // render('zoom');
            })
        )
        // .on("mousedown.zoom", null)
        .on("dblclick.zoom", null);//取消双击时zoom 事件的触发
    // that._hasInit = true;


    //若x,y 有值，则为单击时的重新渲染
    function render(keyWord,target) {

        canvas.nodes = that.getRenderedNodes();
        canvas.links = that.getRenderedLinks();
        context.clearRect(0, 0, that.element.width, that.element.height);
        context.save();


        if(keyWord == 'dragStart'){
            canvas.doubleCanvas = drawLinkCanvas.call(that,canvas,keyWord,target);
            // canvas.doubleNodeCanvas = drawCache(canvas,keyWord,target);
        }else if(keyWord == 'drag'){
            canvas.doubleCanvas = drawLinkCanvas.call(that,canvas,keyWord,target);
            redrawNodeCanvas.call(that,canvas,target);
            drawCache.call(that,canvas);

            // canvas.doubleNodeCanvas = drawCache(canvas,keyWord,target);
            /*var nodeCanvas = canvas.nodeCanvas;
            var nodeContext = nodeCanvas.getContext('2d');
            nodeContext.clearRect(0,0,that.element.width,that.element.height);
            nodeContext.save();
            nodeContext.translate(canvas.transform.x, canvas.transform.y);
            nodeContext.scale(canvas.transform.k, canvas.transform.k);
            var nodes = canvas.nodes;
            for(var j=0;j<nodes.length;j++){
                nodeContext.drawImage(canvas.nodesCache[j],nodes[j].getX()-nodes[j].radius,nodes[j].getY()-nodes[j].radius);
            }
            nodeContext.restore();
            context.drawImage(nodeCanvas,0,0);*/
        }else{
            // context.translate(canvas.transform.x, canvas.transform.y);
            // context.scale(canvas.transform.k, canvas.transform.k);
            canvas.doubleCanvas = null;
            drawLinkCanvas.call(that,canvas);
            // drawNodeCanvas.call(that,canvas);
            redrawNodeCanvas.call(that,canvas);

            drawCache.call(that,canvas);
        }

        context.restore();



    }


    //单击事件
    function _click(d) {
        console.log(d);
        var p = convertToCanvasCor(that.element, d3.event.x, d3.event.y);
        // var p = convertToCanvasCor(that._canvas,d3.event.x,d3.event.y);
        var x = canvas.transform.invertX(p.x);
        var y = canvas.transform.invertY(p.y);
        var targetNode = findPoint(canvas.nodes,x,y);
        var targetLink = null;
        if(!targetNode) targetLink = findLinks(canvas,x,y);
        //调用click 的回调函数
        if(targetNode){
            if(!d3.event.ctrlKey){
                if(targetNode.selected) return;
                that.getSelectedNodes().forEach(function (node) {
                    node.attr('selected',false);
                });
                that.getSelectedLinks().forEach(function (link) {
                    link.attr('selected',false);
                });
            }
            targetNode.attr('selected',!targetNode.selected);
        }else{
            if(targetLink){
                //选中lilnk
                if(!d3.event.ctrlKey){
                    if(targetLink.select) return;
                    that.getSelectedLinks().forEach(function (link) {
                        link.attr('selected',false);
                    });
                    that.getSelectedNodes().forEach(function (node) {
                        node.attr('selected',false);
                    });
                }
                if(targetLink.attr('selected')){
                    //取消选中 箭头指向的点
                    if(targetLink.hasSourceArrow() && targetLink.hasTargetArrow()){
                        //
                        targetLink.source.attr('selected',false);
                        targetLink.target.attr('selected',false);
                    }else if(targetLink.hasSourceArrow()){
                        targetLink.source.attr('selected',false);
                    }else if(targetLink.hasTargetArrow()){
                        targetLink.target.attr('selected',false);
                    }
                }else{
                    //选中 箭头指向的点
                    if(targetLink.hasSourceArrow() && targetLink.hasTargetArrow()){
                        //
                        targetLink.source.attr('selected',true);
                        targetLink.target.attr('selected',true);
                    }else if(targetLink.hasSourceArrow()){
                        targetLink.source.attr('selected',true);
                    }else if(targetLink.hasTargetArrow()){
                        targetLink.target.attr('selected',true);
                    }
                }
                targetLink.attr('selected',!targetLink.selected);

            }else{
                that.getSelectedNodes().forEach(function (node) {
                    node.attr('selected',false);
                });
                that.getSelectedLinks().forEach(function (link) {
                    link.attr('selected',false);
                });
            }

        }

    }

    //双击事件
    function _dblClick(d) {
        console.log('dbclick');
        var p = convertToCanvasCor(that.element, d3.event.x, d3.event.y);
        var x = canvas.transform.invertX(p.x);
        var y = canvas.transform.invertY(p.y);
        var targetNode = findPoint(canvas.nodes,x,y);
        // console.log(targetNode);
        //调用dblClick 的回调函数
        // console.log(targetNode);


        // $scope.$emit('dblClickNode',targetNode);

    }

    function _mousemove() {
        var p = convertToCanvasCor(that.element, d3.event.x, d3.event.y);
        var x = canvas.transform.invertX(p.x);
        var y = canvas.transform.invertY(p.y);
        var targetNode = findPoint(canvas.nodes,x,y);
        if(targetNode){
            if(canvas.mouseTarget && targetNode.id == canvas.mouseTarget.id){
                //nodeMouseOver mouseOver 回调函数
                // console.log('mouseover');
                // console.log(targetNode);
            }else{
                //mouseup 回调函数
                // console.log('mouseout');

            }
            canvas.mouseTarget = targetNode;
            // render();

        }else{
            //mouseout
            if(canvas.mouseTarget){
                // console.log('out'); mouseout 回调函数
                // console.log('mousemove');
                // render();
            }

        }
    }

    function dragsubject() {
        // console.log('dragsubject');
        var transform = canvas.transform;

        var x = canvas.transform.invertX(d3.event.x);
        var y = canvas.transform.invertY(d3.event.y);

        var targetNode = findPoint(canvas.nodes,x,y);
        if(targetNode){
            targetNode.x = canvas.transform.applyX(targetNode.x);
            targetNode.y = canvas.transform.applyY(targetNode.y);
        }

        // console.log(targetNode);
        return targetNode;
    }

    function dragstarted() {
        render('dragStart',d3.event.subject);
        // _click();
        //进行重绘

    }

    //拖拽
    function dragged() {
        console.log('drag');
        d3.event.subject.x = canvas.transform.invertX(d3.event.x);
        d3.event.subject.y = canvas.transform.invertY(d3.event.y);
        //进行重绘
        render('drag',d3.event.subject);

    }

    //拖拽结束
    function dragended() {
        // console.log('dragend');
        d3.event.subject.x = canvas.transform.invertX(d3.event.x);
        d3.event.subject.y = canvas.transform.invertY(d3.event.y);
    }

    function zoomed() {
        console.log(d3.event.transform.k);
        // console.log('zoom');
        canvas.transform = d3.event.transform;
        //进行重绘
        render('zoom');
    }

};

var draw = function (renderType, canvasType) {
    if(canvasType === 'svg'){
        drawNodesSvg.call(this, renderType);
        drawLinksSvg.call(this, renderType);
    }else if(canvasType === 'CANVAS'){
        drawCanvas.call(this);
    }
};

var zoomed = function () {
    //不可移动
    if (!this.movable) {
        //将变换前的translate值赋给变换后的translate值,保持位置不变
        //this.zoom.translate(scope.config.status.translate);
    }
    //不可缩放
    if (!this.zoomable) {
        //this.zoom.scale(scope.config.status.scale);
    }
    //Graph._ifShowLabels();
    
    var previousScale = this._getForceGroup()._pScale;
    var currentScale = this.currentTransform().k.toFixed(4) / 1;
    //缩放网络图
    this._getForceGroup().attr("transform", "translate(" + d3.event.transform.x + ", "+ d3.event.transform.y + ") scale(" + currentScale + ")");
    this._getForceGroup()._pScale = currentScale;
    
    var hideScale = d3.min([this._config.scaleOfHideNodeLabel, this._config.scaleOfHideLinkLabel]);
    
    //render while should hide label
    if(previousScale >= hideScale && currentScale <= hideScale) this.render();
    //panning don't need re-render, render only after zooming
    if(currentScale !== previousScale && currentScale > hideScale) this.render();
};

function transform(k, x, y, duration) {
    var transformed = d3.zoomIdentity;
    if(typeof k === "number") transformed = transformed.scale(k);
    if(typeof x === "number" && typeof y === "number") transformed = transformed.translate(x, y);
    this.svgSelection(duration).call(this.zoom.transform, transformed);
    
    return this;
}

function scaleTo(k, duration) {
    this.transform(k, null, null, duration);
    return this;
}

function translateBy(x, y, duration) {
    this.transform(null, x, y , duration);
    return this;
}

function focus(filter, duration){
    setTimeout(function(){
        var Nodes = this.getNodes(filter);
        if(!Nodes.length) return;
    
        var xAccessor = function(Node){return Node.x}, yAccessor = function(Node){return Node.y};
        var minX = d3.min(Nodes, xAccessor), maxX = d3.max(Nodes, xAccessor), minY = d3.min(Nodes, yAccessor), maxY = d3.max(Nodes, yAccessor);
        var xSpan = maxX - minX, ySpan = maxY - minY;
        var xCenter = (maxX + minX) / 2, yCenter = (maxY + minY) / 2;
        var canvasW = this.element.width.baseVal.value,
            canvasH = this.element.height.baseVal.value;
    
        var xScale = canvasW / xSpan,
            yScale = canvasH / ySpan;
    
        var scale = d3.min([xScale, yScale]);
        if(scale > this._config.maxScale) scale = this._config.maxScale;
        scale = scale === Infinity? 1: scale;
        scale -= scale/5;
    
    
        var transformed = d3.zoomIdentity
            .translate(canvasW / 2, canvasH / 2)
            .scale(scale)
            .translate(-xCenter, -yCenter);
    
        this.svgSelection(duration || 1000).call(this.zoom.transform, transformed);
    }.bind(this), 0);
}

function keydowned() {
    if (!d3.event.metaKey) {
        switch (d3.event.keyCode) {
            //shift alt and space is used by d3 brush
            case 90:
                this.brush.show();
                break;
        }
    }
}

function keyupped() {
    if (!d3.event.metaKey) {
        switch (d3.event.keyCode) {
            case 90:
                this.brush.hide();
                break;
        }
    }
}

var draged = function (currentNode) {
    var nudgedNodes = this.getSelectedNodes();
    for(var i = nudgedNodes.length; i--;){
        nudgedNodes[i]._nudge(d3.event.dx, d3.event.dy, true);
        this.updateDOM.addObj(nudgedNodes[i]);
    }
    this.delayRender(null, RENDER_TYPE.NUDGE);
};

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
    
    this._config = Object.assign({}, DEFAULT_CONFIG, this._config || {}, config || {});
    return this;
}

function selector(selector){
    if(!arguments.length) return this._selector;
    
    this._selector = selector;
    return this;
}

function UpdateDOM(graph){
    this.graph = graph;
    this._updateNodes = [];
    this._updateLinks = [];
}

UpdateDOM.prototype = {
    constructor: UpdateDOM,
    addObj: addObj,
    _addNode: addNode$1,
    _addLink: addLink$1,
    getNodesEle: getNodesEle,
    getLinksEle: getLinksEle,
    clearUpdateNodes: clearUpdateNodes,
    clearUpdateLinks: clearUpdateLinks
    
};

function addObj(Obj, renderType){
    if(Obj instanceof Node){
        this._addNode(Obj);
        if(renderType === RENDER_TYPE.NUDGE){
            var selectedNodes = this.graph.getSelectedNodes();
            var relatedLinks = this.graph.getRelatedLinks(selectedNodes);
            relatedLinks.forEach(function(Link$$1){
                this._addLink(Link$$1);
            }, this);
            
        }
    }
    if(Obj instanceof Link) this._addLink(Obj);
}

function addNode$1(Node$$1){
    if(this._updateNodes.indexOf(Node$$1) === -1) this._updateNodes.push(Node$$1);
}

function addLink$1(Link$$1){
    if(this._updateLinks.indexOf(Link$$1) === -1) this._updateLinks.push(Link$$1);
}

function getNodesEle(){
    return this._updateNodes.map(function(Node$$1){return Node$$1.element;});
}

function getLinksEle(){
    return this._updateLinks.map(function(Link$$1){return Link$$1.element;});
}

function clearUpdateNodes(){
    this._updateNodes = [];
}

function clearUpdateLinks(){
    this._updateLinks = [];
}

function Graph(selector$$1, config$$1) {
    
    this.selector(selector$$1);
    this.config(config$$1);
    
    this._hasInit = false; //init only once
    
    this._nodes = [];
    this._nodesHash = {};
    this._links = [];
    this._linksHash = {};
    
    this.updateDOM = new UpdateDOM(this);
}

Graph.prototype = {
    constructor: Graph,
    selector: selector,
    config: config,
    _render: _render,
    delayRender: delayRender,
    render: render,
    nodes: nodes,
    getNodesOP: getNodesOP,
    getNodes: getNodes,
    getSelectedNodes: getSelectedNodes,
    getRenderedNodes: getRenderedNodes,
    _addNode: addNode,
    removeNodes: removeNodes,
    clearNodes: clearNodes,
    hasNode: hasNode,
    links: links,
    getLinks: getLinks,
    getLinksOP: getLinksOP,
    getSelectedLinks: getSelectedLinks,
    getRenderedLinks: getRenderedLinks,
    getContainLinks: getContainLinks,
    getAttachedLinks: getAttachedLinks,
    getRelatedLinks: getRelatedLinks,
    _addLink: addLink,
    hasLink: hasLink,
    removeLinks: removeLinks,
    _removeLinksOfNode: removeLinksOfNode,
    clearLinks: clearLinks,
    transform: transform,
    scaleTo: scaleTo,
    translateBy: translateBy,
    focus: focus,
    draged: draged,
    _keydowned: keydowned,
    _keyupped: keyupped,
    _init: init,
    _initCache:initCache,
    _draw: draw,
    _zoomed: zoomed,
    currentTransform: function(){
        if(!this.element) return;
        return d3.zoomTransform(this.element);
    },
    brushSelection: function () {
        return this.svgSelection().select('g.brush');
    },
    svgSelection: function(duration){
        var svgSelection = d3.select(this.element);

        if(duration) svgSelection = svgSelection.transition(Math.random()).duration(duration);

        return svgSelection;
    },
    nodesSelection: function(){
        return this.svgSelection().select('.nodes').selectAll("g.node");
    },
    linksSelection: function(){
        return this.svgSelection().select('g.links').selectAll(".link");
    },
    _getForceGroup: function(){
        return this._forceGroupSelection;
    }
};

var index = function (selector$$1, config$$1) {
    return new Graph(selector$$1, config$$1);
};

var filterById = function (id, Nodes) {
    return Nodes.filter(function(Node){
        return Node.id === id;
    })[0];
};

var parseHTML = function (str) {
    var tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = str;
    return tmp.body.children[0];
};

function direction(Links){
    var src = Links[0].getSourceId();
    var dst = Links[0].getTargetId();
    
    return Links.reduce(function(p, Link){
        if(p === DIRECTION.NONE) return Link.attr("direction");
        if(Link.attr("direction") === DIRECTION.NONE) return p;
        if(p === DIRECTION.DOUBLE || Link.attr("direction") === DIRECTION.DOUBLE) return DIRECTION.DOUBLE;
        
        if(Link.getSourceId() === src){
            if((p === DIRECTION.S2D && Link.attr("direction") === DIRECTION.D2S) || (p === DIRECTION.D2S && Link.attr("direction") === DIRECTION.S2D)) return DIRECTION.DOUBLE;
            else return p;
        }else{
            if((p === DIRECTION.S2D && Link.attr("direction") === DIRECTION.S2D) || (p === DIRECTION.D2S && Link.attr("direction") === DIRECTION.D2S)) return DIRECTION.DOUBLE;
            else return p;
        }
        
        if(p === Link.attr("direction")) return p;
    }, DIRECTION.NONE);
}

var safeExecute = function (maybeFunction) {
    return (maybeFunction instanceof Function)? maybeFunction(): maybeFunction;
};

var utils = {
    filterBy: filterBy,
    filterById: filterById,
    getIds: getIds,
    getAbsUrl: getAbsUrl,
    toArray: toArray,
    getStrLen: getStrLen,
    getOffsetCoordinate: getOffsetCoordinate,
    parseHTML: parseHTML,
    direction: direction,
    safeExecute: safeExecute
};

//only for test now

exports.graph = index;
exports.utils = utils;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=g3.js.map
