"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnlayerEmailJson = void 0;
class UnlayerEmailJson {
    constructor() {
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
        this.mapBeRow2Unlayer = (rows) => rows.map(r => {
            return {
                cells: this.mapBeCell2Unlayer(r.columns),
                columns: this.mapBeColumn2Unlayer(r.columns),
                values: this.mapBeStyle2Unlayer(r.container.style)
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
        this.mapBeColumn2Unlayer = (columns) => columns.map(c => {
            return {
                contents: this.mapBeModule2Unlayer(c.modules),
                values: this.mapBeStyle2Unlayer(c.style),
            };
        });
        /**
         *
         * @param modules Module[]
         * @returns Unlayer Content[]
         */
        this.mapBeModule2Unlayer = (modules) => modules.map((m, i) => {
            return {
                type: m.type.split('-')[m.type.split('-').length - 1],
                values: this.mapBeDescriptor2Unlayer(m.descriptor, `u_content_${m.type.split('-')[m.type.split('-').length - 1]}_${i}`)
            };
        });
        /**
         *
         * @param descriptor Descriptor
         * @returns Unlayer Values
         */
        this.mapBeDescriptor2Unlayer = (descriptor, id_type) => {
            var _a, _b, _c, _d;
            return Object.assign({}, Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, descriptor.computedStyle), descriptor.style), this.mapBeStyle2Unlayer((_a = descriptor === null || descriptor === void 0 ? void 0 : descriptor.text) === null || _a === void 0 ? void 0 : _a.style, (_b = descriptor === null || descriptor === void 0 ? void 0 : descriptor.text) === null || _b === void 0 ? void 0 : _b.html, id_type)), (_c = descriptor === null || descriptor === void 0 ? void 0 : descriptor.text) === null || _c === void 0 ? void 0 : _c.computedStyle), {
                src: {
                    height: "auto",
                    width: "auto",
                    url: (_d = descriptor === null || descriptor === void 0 ? void 0 : descriptor.image) === null || _d === void 0 ? void 0 : _d.src
                }
            }));
        };
        /**
         *
         * @param style Style
         * @param text html
         * @returns Unlayer Values
         */
        this.mapBeStyle2Unlayer = (style, text = '', id_type) => style ? Object.assign({}, {
            containerPadding: style === null || style === void 0 ? void 0 : style.padding,
            headingType: "h1",
            fontFamily: {
                label: "Bee font",
                value: style["font-family"]
            },
            fontSize: style["font-size"],
            textAlign: style["text-align"],
            lineHeight: style["line-height"],
            linkStyle: style["link-style"],
            displayCondition: null,
            _meta: {
                htmlID: id_type,
                htmlClassNames: id_type === null || id_type === void 0 ? void 0 : id_type.replace("_1", "")
            },
            selectable: true,
            draggable: true,
            duplicatable: false,
            deletable: true,
            hideable: false,
            text: text,
            href: {
                name: "web",
                values: {
                    href: "",
                    target: "_blank"
                }
            },
            buttonColors: {
                color: style.color,
                backgroundColor: style["background-color"],
                hoverColor: style === null || style === void 0 ? void 0 : style.linkColor,
                hoverBackgroundColor: style["background-color"]
            },
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
                center: false,
                cover: false
            },
            contentWidth: "500px",
            contentAlign: "center",
            preheaderText: "",
            columns: false,
            columnsBackgroundColor: '',
            hideDesktop: false,
        }) : {};
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
        let design = {};
        Object.entries(data["page"]).forEach(([key, value]) => {
            switch (key) {
                case "body":
                    design.body = {
                        rows: this.mapBeRow2Unlayer(data["page"]["rows"]),
                        values: this.mapBeStyle2Unlayer(data["page"]["body"].container.style, '', `u_body`)
                    };
                    break;
                case "description":
                    design.counters = {
                        u_column: 1,
                        u_row: 1,
                        u_content_button: 1,
                        u_content_heading: 1,
                        u_content_text: 1
                    };
                    break;
                case "template":
                    design.schemaVersion = 7;
                    break;
            }
        });
        return design;
    }
}
exports.UnlayerEmailJson = UnlayerEmailJson;
