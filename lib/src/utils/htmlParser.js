"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlParser = void 0;
const jsdom_1 = require("jsdom");
class HtmlParser {
}
exports.HtmlParser = HtmlParser;
_a = HtmlParser;
HtmlParser.parseBody = (html) => _a.document = new jsdom_1.JSDOM(html).window.document;
HtmlParser.parseRows = (body) => {
    var _b;
    const children = Array.from((_b = body === null || body === void 0 ? void 0 : body.children) !== null && _b !== void 0 ? _b : []).filter(x => x.tagName.toUpperCase() != "SCRIPT" && x.tagName.toUpperCase() != "STYLE");
    if (children.length > 1)
        return Array.from(children);
    let a = children[0];
    if (a) {
        if ((a === null || a === void 0 ? void 0 : a.children.length) > 1)
            return Array.from(a.children);
        let b = a === null || a === void 0 ? void 0 : a.children[0];
        if (b) {
            if ((b === null || b === void 0 ? void 0 : b.children.length) > 1)
                return Array.from(b.children);
            let c = b === null || b === void 0 ? void 0 : b.children[0];
            if (c) {
                if ((c === null || c === void 0 ? void 0 : c.children.length) > 1)
                    return Array.from(c.children);
                let d = c === null || c === void 0 ? void 0 : c.children[0];
                if ((d === null || d === void 0 ? void 0 : d.children.length) > 1)
                    return Array.from(d.children);
                return _a.parseParentChildren(d);
            }
            return _a.parseParentChildren(b);
        }
        return _a.parseParentChildren(a);
    }
    return [];
};
HtmlParser.parseParentChildren = (element) => { var _b, _c; return Array.from((_c = (_b = element === null || element === void 0 ? void 0 : element.parentElement) === null || _b === void 0 ? void 0 : _b.children) !== null && _c !== void 0 ? _c : []); };
HtmlParser.parseColumns = (row, hasMultipleCells) => { var _b, _c, _d, _e; return Array.from(hasMultipleCells ? (_d = (_c = (_b = row.children[0]) === null || _b === void 0 ? void 0 : _b.children[0]) === null || _c === void 0 ? void 0 : _c.children) !== null && _d !== void 0 ? _d : (_e = row.children[0]) === null || _e === void 0 ? void 0 : _e.children : row.children); };
