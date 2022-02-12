"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInlineStyle = exports.parseColumns = exports.isSubElement = exports.parseParentChildren = exports.parseChildren = exports.parseRows = exports.parseHtml = void 0;
function parseHtml(html) {
    if (typeof window === "undefined") {
        try {
            var dom = require("jsdom");
            return new dom.JSDOM(html).window.document.querySelector("body");
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
    return Array.from(parseChildren(Array.from((_a = body === null || body === void 0 ? void 0 : body.children) !== null && _a !== void 0 ? _a : [])
        .filter(x => x.tagName.toUpperCase() != "SCRIPT" &&
        x.tagName.toUpperCase() != "STYLE")));
}
exports.parseRows = parseRows;
function parseChildren(children, isContent = false, parent = null) {
    var _a;
    if (children.length == 1) {
        return parseChildren((_a = children[0]) === null || _a === void 0 ? void 0 : _a.children, isContent, children[0]);
    }
    if (!children.length) {
        return parseParentChildren(parent);
    }
    return children;
}
exports.parseChildren = parseChildren;
function parseParentChildren(element) {
    var _a, _b, _c, _d, _e;
    if (isSubElement(element)) {
        return parseParentChildren(element.parentElement);
    }
    return Array.from((_e = (_c = (_b = (_a = element === null || element === void 0 ? void 0 : element.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.children) !== null && _c !== void 0 ? _c : (_d = element === null || element === void 0 ? void 0 : element.parentElement) === null || _d === void 0 ? void 0 : _d.children) !== null && _e !== void 0 ? _e : []);
}
exports.parseParentChildren = parseParentChildren;
function isSubElement(element) {
    return ["SPAN", "TR", "TD", "TBODY", "A"].
        some(x => {
        var _a, _b, _c, _d, _e;
        return (x == ((_b = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.tagName) === null || _b === void 0 ? void 0 : _b.toUpperCase())) ||
            (x == ((_e = (_d = (_c = element === null || element === void 0 ? void 0 : element.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.tagName) === null || _e === void 0 ? void 0 : _e.toUpperCase()));
    });
}
exports.isSubElement = isSubElement;
function parseColumns(row, hasMultipleCells) {
    var _a, _b, _c, _d;
    return Array.from(hasMultipleCells ?
        (_c = (_b = (_a = row.children[0]) === null || _a === void 0 ? void 0 : _a.children[0]) === null || _b === void 0 ? void 0 : _b.children) !== null && _c !== void 0 ? _c : (_d = row.children[0]) === null || _d === void 0 ? void 0 : _d.children :
        row.children);
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
