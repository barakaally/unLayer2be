"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unlayerhtml = void 0;
const jsdom_1 = require("jsdom");
class Unlayerhtml {
    constructor() {
        this.getHtml = (html) => {
            this.window = new jsdom_1.JSDOM(html).window;
            return this.window.document;
        };
        /**
        *
        * @param style Style
        * @param text html
        * @returns Unlayer Values
        */
        this.htmlStyle2Unlayer = (style, text = '', id_type) => style ? Object.assign({}, {
            containerPadding: style === null || style === void 0 ? void 0 : style.padding,
            color: "",
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
            backgroundColor: style["background-color"],
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
            columnsBackgroundColor: '',
            hideDesktop: false,
        }) : {};
    }
    from(data) {
        var _a;
        let design = {};
        const body = this.getHtml(data).querySelector("body");
        design.body = {
            rows: Array.from((_a = body === null || body === void 0 ? void 0 : body.children[0].children[0].children[0].children[0].children) !== null && _a !== void 0 ? _a : []).map((row) => {
                return {
                    cells: [12],
                    columns: Array.from(row.children).map((column, i) => {
                        return {
                            contents: Array.from(column.children).map((content, i) => {
                                console.log(`content${i}`, content === null || content === void 0 ? void 0 : content.childElementCount);
                                return {
                                    type: "text",
                                    values: this.htmlStyle2Unlayer(content.style, content.outerHTML, `u_content_${i}`)
                                };
                            }),
                            values: this.htmlStyle2Unlayer(column === null || column === void 0 ? void 0 : column.style, '', `u_column_${i}`),
                        };
                    }),
                    values: this.htmlStyle2Unlayer(row.style, '', `u_row_${1}`)
                };
            }),
            values: this.htmlStyle2Unlayer(body === null || body === void 0 ? void 0 : body.style, '', `u_body`)
        };
        // console.log(JSON.stringify(design, null, 4));
        return design;
    }
}
exports.Unlayerhtml = Unlayerhtml;
