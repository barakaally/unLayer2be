"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Html2Unlayer = void 0;
const htmlParser_1 = require("../utils/htmlParser");
class Html2Unlayer {
    /**
     *
     */
    constructor(data) {
        this.columns = 0;
        this.rows = 0;
        this.headings = 0;
        this.buttons = 0;
        this.texts = 0;
        this.images = 0;
        this.menus = 0;
        /**
        *
        * @param columns columns Column[]
        * @returns number[]
        */
        this.getCells = (columns) => {
            var _a, _b;
            const cells = columns === null || columns === void 0 ? void 0 : columns.map(x => {
                var _a;
                return (_a = Array.from(x === null || x === void 0 ? void 0 : x.children)) === null || _a === void 0 ? void 0 : _a.map((y) => { var _a; return Number((_a = y === null || y === void 0 ? void 0 : y.style["min-width"]) === null || _a === void 0 ? void 0 : _a.replace(/[a-zA-Z]+/g, "")); });
            });
            return (_b = (_a = cells[cells.length - 1]) === null || _a === void 0 ? void 0 : _a.map(x => (!isNaN(x) && x) ? Math.round((x / Math.min(...cells[cells.length - 1].map(y => y == 0 ? 12 : y)))) : 12)) !== null && _b !== void 0 ? _b : [12];
        };
        this.hasMultipleCell = (columns) => this.getCells(columns).length > 1;
        this.getColumns = (columns) => Array.from(columns).map((column, i) => {
            this.countElement("column");
            return {
                contents: this.getContents(column),
                values: this.getStyle(column === null || column === void 0 ? void 0 : column.style, '', `u_column_${i + 1}`),
            };
        });
        this.getContents = (column) => Array.from((0, htmlParser_1.parseChildren)(column.children, true)).map((content, i) => {
            var _a;
            const type = this.getContentType(content);
            this.countElement(type);
            return {
                type: type,
                values: Object.assign(Object.assign({}, this.getStyle(content.style, content.outerHTML, `u_content_${type}_${i + 1}`)), {
                    src: {
                        url: (_a = content === null || content === void 0 ? void 0 : content.querySelector("img")) === null || _a === void 0 ? void 0 : _a.src,
                        width: "auto",
                        height: "auto"
                    }
                })
            };
        });
        /**
        *
        * @param style Style
        * @param text html
        * @returns Unlayer Values
        */
        this.getStyle = (style, text = '', id_type) => style ? Object.assign({}, {
            containerPadding: style === null || style === void 0 ? void 0 : style.padding,
            color: this.getColor(style["color"]),
            headingType: "",
            fontFamily: style["font-family"] ? {
                label: "font",
                value: style["font-family"]
            } : {},
            fontSize: style["font-size"],
            textAlign: style["text-align"],
            lineHeight: style["line-height"],
            linkStyle: style["link-style"],
            displayCondition: null,
            _meta: {
                htmlID: id_type,
                htmlClassNames: id_type === null || id_type === void 0 ? void 0 : id_type.replace(/_\d/g, "")
            },
            selectable: true,
            draggable: true,
            duplicatable: true,
            deletable: true,
            hideable: false,
            text: text,
            size: {
                autoWidth: true,
                width: style === null || style === void 0 ? void 0 : style.width
            },
            padding: style["padding"],
            border: {
                borderBottom: style["border-bottom"],
                borderLeft: style["border-left"],
                borderRight: style["border-right"],
                borderTop: style["border-top"]
            },
            borderRadius: style["border-radius"],
            calculatedWidth: null,
            calculatedHeight: null,
            textColor: style["color"],
            backgroundColor: this.getColor(style["background-color"]),
            backgroundImage: {
                url: style["background-image"],
                fullWidth: false,
                repeat: false,
                center: true,
                cover: false
            },
            contentWidth: "500px",
            contentAlign: "center",
            preheaderText: "",
            columns: id_type === null || id_type === void 0 ? void 0 : id_type.includes("column"),
            hideDesktop: false,
        }) : {};
        /**
         *
         * @param color string
         * @returns String
         */
        this.getColor = (color) => color === "transparent" ? "" : color;
        this.getContentType = (content) => {
            if (content.querySelector("img")) {
                return "image";
            }
            if (/(class=*button*|class=*btn*)/gi.test(content.outerHTML)) {
                return "button";
            }
            if (/menu/gi.test(content.outerHTML)) {
                return "menu";
            }
            if (/h[1-6]/gi.test(content.outerHTML)) {
                return "heading";
            }
            return "text";
        };
        this.body = (0, htmlParser_1.parseHtml)(data);
    }
    getDesign() {
        var _a;
        let design = {};
        design.body = {
            rows: (0, htmlParser_1.parseRows)(this.body).map((row, i) => {
                var _a, _b, _c;
                this.countElement("row");
                const hasMultipleCells = this.hasMultipleCell(Array.from((_b = (_a = row.children[0]) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : []));
                const columnsBackgroundColor = hasMultipleCells ? this.getColor((_c = row.children[0]) === null || _c === void 0 ? void 0 : _c.style["background-color"]) : this.getColor(row === null || row === void 0 ? void 0 : row.style["background-color"]);
                return {
                    cells: this.getCells(Array.from(row.children[0].children)),
                    columns: this.getColumns((0, htmlParser_1.parseColumns)(row, hasMultipleCells)),
                    values: Object.assign(Object.assign({}, this.getStyle(row.style, '', `u_row_${i + 1}`)), { columnsBackgroundColor })
                };
            }),
            values: this.getStyle((_a = this.body) === null || _a === void 0 ? void 0 : _a.style, '', `u_body`)
        };
        design.counters = {
            u_column: this.columns,
            u_row: this.rows,
            u_content_button: this.buttons,
            u_content_heading: this.headings,
            u_content_text: this.texts,
            u_content_image: this.images,
            u_content_menu: this.menus
        };
        design.schemaVersion = 7;
        return design;
    }
    /**
     *
     * @param type String @description unlayer element type
     */
    countElement(type) {
        switch (type) {
            case "row":
                this.rows += 1;
                break;
            case "column":
                this.columns += 1;
                break;
            case "button":
                this.buttons += 1;
                break;
            case "heading":
                this.headings += 1;
                break;
            case "text":
                this.texts += 1;
                break;
            case "image":
                this.images += 1;
                break;
            case "menu":
                this.menus += 1;
                break;
        }
    }
}
exports.Html2Unlayer = Html2Unlayer;
