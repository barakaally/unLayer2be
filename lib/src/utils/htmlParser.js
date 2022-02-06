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
    let a = Array.from((_b = body === null || body === void 0 ? void 0 : body.children) !== null && _b !== void 0 ? _b : []).filter(x => x.tagName.toUpperCase() != "SCRIPT")[0];
    if (a) {
        if ((a === null || a === void 0 ? void 0 : a.children.length) > 1)
            return _a.parseParentChildren(a);
        let b = a === null || a === void 0 ? void 0 : a.children[0];
        if (b) {
            if ((b === null || b === void 0 ? void 0 : b.children.length) > 1)
                return _a.parseParentChildren(b);
            let c = b === null || b === void 0 ? void 0 : b.children[0];
            if (c) {
                if ((c === null || c === void 0 ? void 0 : c.children.length) > 1)
                    return _a.parseParentChildren(c);
                let d = c === null || c === void 0 ? void 0 : c.children[0];
                if ((d === null || d === void 0 ? void 0 : d.children.length) > 1)
                    return Array.from(d.children);
                return _a.parseParentChildren(d);
            }
            c = _a.document.createElement('div');
            const d = _a.document.createElement('div');
            a.append(c);
            c.append(d);
            d.append(b);
            return Array.from(d.children);
        }
        b = _a.document.createElement('div');
        const c = _a.document.createElement('div');
        const d = _a.document.createElement('div');
        b.append(c);
        c.append(d);
        d.append(a);
        return Array.from(d.children);
    }
    a = _a.document.createElement('div');
    const b = _a.document.createElement('div');
    const c = _a.document.createElement('div');
    const d = _a.document.createElement('div');
    body === null || body === void 0 ? void 0 : body.append(a);
    a.append(b);
    b.append(c);
    c.append(d);
    return [];
};
HtmlParser.parseParentChildren = (element) => { var _b, _c; return Array.from((_c = (_b = element === null || element === void 0 ? void 0 : element.parentElement) === null || _b === void 0 ? void 0 : _b.children) !== null && _c !== void 0 ? _c : []); };
HtmlParser.parseColumns = (row, hasMultipleCells) => { var _b, _c, _d, _e; return Array.from(hasMultipleCells ? (_d = (_c = (_b = row.children[0]) === null || _b === void 0 ? void 0 : _b.children[0]) === null || _c === void 0 ? void 0 : _c.children) !== null && _d !== void 0 ? _d : (_e = row.children[0]) === null || _e === void 0 ? void 0 : _e.children : row.children); };
