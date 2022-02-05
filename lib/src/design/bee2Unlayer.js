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
        this.mapBeRow2Unlayer = (rows) => rows.map((r, i) => {
            this.countUnlayerElement("row");
            return {
                cells: this.mapBeCell2Unlayer(r.columns),
                columns: this.mapBeColumn2Unlayer(r.columns),
                values: this.mapBeStyle2Unlayer(r.container.style, '', `u_row_${i + 1}`)
            };
        });
        /**
         *
         * @param columns columns Column[]
         * @returns number[]
         */
        this.mapBeCell2Unlayer = (columns) => columns.map(x => x["grid-columns"]);
        /**
         *
         * @param columns Column[]
         * @returns Unlayer Column[]
         */
        this.mapBeColumn2Unlayer = (columns) => columns.map((c, i) => {
            this.countUnlayerElement("column");
            return {
                contents: this.mapBeModule2Unlayer(c.modules),
                values: this.mapBeStyle2Unlayer(c.style, '', `u_column_${i + 1}`),
            };
        });
        /**
         *
         * @param modules Module[]
         * @returns Unlayer Content[]
         */
        this.mapBeModule2Unlayer = (modules) => modules.map((m, i) => {
            this.countUnlayerElement(m.type.split('-')[m.type.split('-').length - 1]);
            return {
                type: m.type.split('-')[m.type.split('-').length - 1],
                values: this.mapBeDescriptor2Unlayer(m.descriptor, `u_content_${m.type.split('-')[m.type.split('-').length - 1]}_${i + 1}`)
            };
        });
        /**
         *
         * @param descriptor Descriptor
         * @returns Unlayer Values
         */
        this.mapBeDescriptor2Unlayer = (descriptor, id_type) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            return Object.assign({}, Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, descriptor.computedStyle), this.mapBeStyle2Unlayer(descriptor.style)), this.mapBeStyle2Unlayer((_b = (_a = descriptor === null || descriptor === void 0 ? void 0 : descriptor.text) === null || _a === void 0 ? void 0 : _a.style) !== null && _b !== void 0 ? _b : (_c = descriptor === null || descriptor === void 0 ? void 0 : descriptor.button) === null || _c === void 0 ? void 0 : _c.style, (_e = (_d = descriptor === null || descriptor === void 0 ? void 0 : descriptor.text) === null || _d === void 0 ? void 0 : _d.html) !== null && _e !== void 0 ? _e : (_f = descriptor === null || descriptor === void 0 ? void 0 : descriptor.button) === null || _f === void 0 ? void 0 : _f.label, id_type)), (_g = descriptor === null || descriptor === void 0 ? void 0 : descriptor.text) === null || _g === void 0 ? void 0 : _g.computedStyle), this.mapImage2Unlayer((_h = descriptor === null || descriptor === void 0 ? void 0 : descriptor.image) === null || _h === void 0 ? void 0 : _h.src)), this.mapButton2Unlayer((_j = descriptor === null || descriptor === void 0 ? void 0 : descriptor.button) === null || _j === void 0 ? void 0 : _j.href, (_k = descriptor === null || descriptor === void 0 ? void 0 : descriptor.button) === null || _k === void 0 ? void 0 : _k.style)));
        };
        /**
         *
         * @param style Style
         * @param text html
         * @returns Unlayer Values
         */
        this.mapBeStyle2Unlayer = (style, text = '', id_type) => style ? Object.assign({}, {
            containerPadding: style === null || style === void 0 ? void 0 : style.padding,
            color: this.mapColor2Unlayer(style.color),
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
            textColor: this.mapColor2Unlayer(style["color"]),
            backgroundColor: this.mapColor2Unlayer(style["background-color"]),
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
        /**
         *
         * @param color string
         * @returns String
         */
        this.mapColor2Unlayer = (color) => color === "transparent" ? "" : color;
        /**
         *
         * @param src
         * @param width
         * @param height
         * @returns
         */
        this.mapImage2Unlayer = (src, width = "auto", height = "auto") => Object.assign({}, {
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
        this.mapButton2Unlayer = (href, style) => Object.assign({}, Object.assign(Object.assign({}, this.mapButtonColors(style)), this.mapLink(href)));
        /**
         *
         * @param style
         * @returns
         */
        this.mapButtonColors = (style) => Object.assign({}, {
            buttonColors: Object.assign(Object.assign({}, this.mapBeStyle2Unlayer(style)), { backgroundColor: "#3AAEE0", hoverColor: "#FFFFFF", hoverBackgroundColor: "#3AAEE0" })
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
                        rows: this.mapBeRow2Unlayer(data["page"]["rows"]),
                        values: this.mapBeStyle2Unlayer(data["page"]["body"].container.style, '', `u_body`)
                    };
                    break;
                case "description":
                    design.counters = {
                        u_column: this.columns,
                        u_row: this.rows,
                        u_content_button: this.buttons,
                        u_content_heading: this.headings,
                        u_content_text: this.texts
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
    countUnlayerElement(type) {
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
        }
    }
}
exports.Bee2Unlayer = Bee2Unlayer;
