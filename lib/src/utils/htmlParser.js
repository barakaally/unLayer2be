"use strict";
/**
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInlineStyle = exports.parseColumns = exports.parseParentChildren = exports.parseRows = exports.parseHtml = void 0;
function parseHtml(html) {
    if (typeof window === "undefined") {
        try {
            let jsdom = require("jsdom");
            return new jsdom.JSDOM(html).window.document.querySelector("body");
        }
        catch (e) {
            throw new Error(e.message);
        }
    }
    else {
        return new DOMParser().parseFromString(html, "text/html").querySelector("body");
    }
}
exports.parseHtml = parseHtml;
function parseRows(body) {
    var _a;
    const children = Array.from((_a = body === null || body === void 0 ? void 0 : body.children) !== null && _a !== void 0 ? _a : []).filter(x => x.tagName.toUpperCase() != "SCRIPT" && x.tagName.toUpperCase() != "STYLE");
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
                return parseParentChildren(d);
            }
            return parseParentChildren(b);
        }
        return parseParentChildren(a);
    }
    return [];
}
exports.parseRows = parseRows;
function parseParentChildren(element) {
    var _a, _b;
    return Array.from((_b = (_a = element === null || element === void 0 ? void 0 : element.parentElement) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : []);
}
exports.parseParentChildren = parseParentChildren;
function parseColumns(row, hasMultipleCells) {
    var _a, _b, _c, _d;
    return Array.from(hasMultipleCells ? (_c = (_b = (_a = row.children[0]) === null || _a === void 0 ? void 0 : _a.children[0]) === null || _b === void 0 ? void 0 : _b.children) !== null && _c !== void 0 ? _c : (_d = row.children[0]) === null || _d === void 0 ? void 0 : _d.children : row.children);
}
exports.parseColumns = parseColumns;
function parseInlineStyle(element) {
    let style = {};
    const style_ = element.getAttribute("style");
    style_ === null || style_ === void 0 ? void 0 : style_.split(";").forEach(x => {
        const key = x.split(":")[0];
        const value = x.split(":")[1];
        Object.assign(style, { [key]: value });
    });
    return style;
}
exports.parseInlineStyle = parseInlineStyle;
