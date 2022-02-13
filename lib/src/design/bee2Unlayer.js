"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bee2Unlayer = void 0;
class Bee2Unlayer {
    constructor() {
        this.columns = 0;
        this.rows = 0;
        this.headings = 0;
        this.buttons = 0;
        this.texts = 0;
        this.images = 0;
        this.menus = 0;
        /**
         *
         * @param data BeeDesign
         * @returns UnlayerDesign
         */
        this.fromDesign = (data) => this.getDesign(data);
        /**
         *
         * @param rows Row[]
         * @returns UnLayer Row[]
         */
        this.getRows = (rows) => rows.map((r, i) => {
            this.countElement("row");
            return {
                cells: this.getCells(r.columns),
                columns: this.getColumns(r.columns),
                values: Object.assign(Object.assign({}, this.getStyle(r.container.style, '', `u_row_${i + 1}`)), { columnsBackgroundColor: this.getColor(r.content.style["background-color"]) })
            };
        });
        /**
         *
         * @param columns columns Column[]
         * @returns number[]
         */
        this.getCells = (columns) => columns.map(x => x["grid-columns"]);
        /**
         *
         * @param columns Column[]
         * @returns Unlayer Column[]
         */
        this.getColumns = (columns) => columns.map((c, i) => {
            this.countElement("column");
            return {
                contents: this.getContents(c.modules),
                values: this.getStyle(c.style, '', `u_column_${i + 1}`),
            };
        });
        /**
         *
         * @param modules Module[]
         * @returns Unlayer Content[]
         */
        this.getContents = (modules) => modules.map((m, i) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            this.countElement(m.type.split('-')[m.type.split('-').length - 1]);
            return {
                type: m.type.split('-')[m.type.split('-').length - 1],
                values: Object.assign(Object.assign(Object.assign(Object.assign({}, this.getStyle((_c = (_b = (_a = m.descriptor) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.style) !== null && _c !== void 0 ? _c : (_e = (_d = m.descriptor) === null || _d === void 0 ? void 0 : _d.button) === null || _e === void 0 ? void 0 : _e.style, (_h = (_g = (_f = m.descriptor) === null || _f === void 0 ? void 0 : _f.text) === null || _g === void 0 ? void 0 : _g.html) !== null && _h !== void 0 ? _h : (_k = (_j = m.descriptor) === null || _j === void 0 ? void 0 : _j.button) === null || _k === void 0 ? void 0 : _k.label, `u_content_${m.type.split('-')[m.type.split('-').length - 1]}_${i + 1}`)), this.getImage((_m = (_l = m.descriptor) === null || _l === void 0 ? void 0 : _l.image) === null || _m === void 0 ? void 0 : _m.src)), this.getButton((_p = (_o = m.descriptor) === null || _o === void 0 ? void 0 : _o.button) === null || _p === void 0 ? void 0 : _p.href, (_r = (_q = m.descriptor) === null || _q === void 0 ? void 0 : _q.button) === null || _r === void 0 ? void 0 : _r.style)), { containerPadding: "" })
            };
        });
        /**
         *
         * @param style Style
         * @param text html
         * @returns Unlayer Values
         */
        this.getStyle = (style, text = '', id_type) => style ? Object.assign({}, {
            color: this.getColor(style.color),
            headingType: "",
            fontFamily: style["font-family"] ? {
                label: "Fonts",
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
            textColor: this.getColor(style["color"]),
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
        /**
         *
         * @param src
         * @param width
         * @param height
         * @returns
         */
        this.getImage = (src, width = "auto", height = "auto") => Object.assign({}, {
            src: {
                height: height,
                width: width,
                url: src
            }
        });
        /**
         *
         * @param href
         * @param style
         * @returns
         */
        this.getButton = (href, style) => Object.assign({}, Object.assign(Object.assign({}, this.mapButtonColors(style)), this.mapLink(href)));
        /**
         *
         * @param style
         * @returns
         */
        this.mapButtonColors = (style) => Object.assign({}, {
            buttonColors: Object.assign(Object.assign({}, this.getStyle(style)), { backgroundColor: "#3AAEE0", hoverColor: "#FFFFFF", hoverBackgroundColor: "#3AAEE0" })
        });
        /**
         *
         * @param href
         * @returns
         */
        this.mapLink = (href) => Object.assign({}, {
            href: {
                name: "web",
                values: {
                    href: href,
                    target: "_blank"
                }
            }
        });
    }
    /**
     *
     * @param data string @description Beefee url encode string
     * @returns UnlayerDesign
     */
    fromString(data) {
        let design = {};
        if (typeof data === 'string') {
            try {
                design = JSON.parse(decodeURIComponent(data));
            }
            catch (error) {
                design = JSON.parse(unescape(data));
            }
        }
        if (!Object.keys(design).includes("page"))
            return design;
        else
            return this.getDesign(design);
    }
    /**
     *
     * @param data BeeDesign
     * @returns UnlayerDesign
     */
    getDesign(data) {
        var _a;
        let design = {};
        if (!data["page"])
            throw new Error("design must have page");
        (_a = Object.entries(data["page"])) === null || _a === void 0 ? void 0 : _a.forEach(([key, value]) => {
            switch (key) {
                case "body":
                    design.body = {
                        rows: this.getRows(data["page"]["rows"]),
                        values: this.getStyle(data["page"]["body"].container.style, '', `u_body`)
                    };
                    break;
                case "description":
                    design.counters = {
                        u_column: this.columns,
                        u_row: this.rows,
                        u_content_button: this.buttons,
                        u_content_heading: this.headings,
                        u_content_text: this.texts,
                        u_content_image: this.images,
                        u_content_menu: this.menus
                    };
                    break;
                case "template":
                    design.schemaVersion = 7;
                    break;
            }
        });
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
        }
    }
}
exports.Bee2Unlayer = Bee2Unlayer;
