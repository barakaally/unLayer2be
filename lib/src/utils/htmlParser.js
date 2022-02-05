"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlParser = void 0;
const jsdom_1 = require("jsdom");
class HtmlParser {
}
exports.HtmlParser = HtmlParser;
HtmlParser.parse = (html) => new jsdom_1.JSDOM(html).window.document;
