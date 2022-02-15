"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseInlineStyle = exports.parseColumns = exports.addContainer = exports.isSubElement = exports.parseChildren = exports.parseRows = exports.parseHtml = void 0;
const CONTENTS = ["P", "HR"];
const INLINES = ["STRONG", "EM", "BR"];
const SUBELEMENTS = ["IMG", "SPAN", "TR", "TD", "TBODY", "TABLE", "A", "P", "H1", "H2", "H3", "H4", "H5", "H6"];
function parseHtml(html) {
    if (typeof window === "undefined") {
        try {
            const dom = require("jsdom");
            const document = new dom.JSDOM(html).window.document;
            globalThis.document = document;
            return document.querySelector("body");
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
    var _a, _b, _c, _d;
    if (children.length == 1 &&
        children.length == 1 &&
        children[0].tagName.toUpperCase() != "A" &&
        !CONTENTS.includes((_a = children[0]) === null || _a === void 0 ? void 0 : _a.tagName.toUpperCase()) &&
        !INLINES.includes((_b = children[0]) === null || _b === void 0 ? void 0 : _b.tagName.toUpperCase()) &&
        ((isContent && isSubElement(children[0])) ||
            (isContent && ((_c = children[0]) === null || _c === void 0 ? void 0 : _c.querySelector("img"))) ||
            (!isContent))) {
        return parseChildren((_d = children[0]) === null || _d === void 0 ? void 0 : _d.children, isContent, children[0]);
    }
    if (children.length == 1 &&
        children[0].tagName.toUpperCase() == "A") {
        return Array.from(addContainer(children[0].parentElement).children)
            .map((x) => isSubElement(x) ? addContainer(x) : x);
    }
    if (!children.length && parent) {
        return Array.from(addContainer(parent).children)
            .map((x) => isSubElement(x) ? addContainer(x) : x);
    }
    if (CONTENTS.some(x => Array.from(children).map(y => y.tagName.toUpperCase()).includes(x))) {
        return [addContainer(children[0].parentElement)];
    }
    if (INLINES.some(x => Array.from(children).map(y => y.tagName.toUpperCase()).includes(x))) {
        return Array.from(children[0].parentElement);
    }
    return Array.from(children).map(x => isSubElement(x) ?
        addContainer(x) :
        x);
}
exports.parseChildren = parseChildren;
function isSubElement(element) {
    return SUBELEMENTS.
        some(x => {
        var _a, _b, _c;
        return (x == ((_a = element === null || element === void 0 ? void 0 : element.tagName) === null || _a === void 0 ? void 0 : _a.toUpperCase())) ||
            (x == ((_c = (_b = element === null || element === void 0 ? void 0 : element.parentElement) === null || _b === void 0 ? void 0 : _b.tagName) === null || _c === void 0 ? void 0 : _c.toUpperCase()));
    });
}
exports.isSubElement = isSubElement;
function addContainer(element) {
    var _a;
    let container = document.createElement("div");
    container.setAttribute("class", `unlayer2be`);
    container.innerHTML = element.outerHTML;
    (_a = element.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(container, element);
    return container;
}
exports.addContainer = addContainer;
function parseColumns(row, hasMultipleCells = false) {
    var _a, _b, _c, _d;
    return Array.from(hasMultipleCells ?
        (_d = (_c = (_b = (_a = row === null || row === void 0 ? void 0 : row.children[0]) === null || _a === void 0 ? void 0 : _a.children[0]) === null || _b === void 0 ? void 0 : _b.children[0]) === null || _c === void 0 ? void 0 : _c.children) !== null && _d !== void 0 ? _d : [] :
        row === null || row === void 0 ? void 0 : row.children).map(x => isSubElement(x) ? addContainer(x) : x);
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
