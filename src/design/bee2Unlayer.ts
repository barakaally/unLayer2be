import { BeeDesign, Body, Column, ComputedStyle, Descriptor, Module, Row, Style } from "../model/bee.model";
import { Body as UBody } from "../model/unlayer.model";
import { UnlayerDesign } from "../model/unlayer.model";

export class Bee2Unlayer {

    private columns: number = 0;
    private rows: number = 0;
    private headings: number = 0;
    private buttons: number = 0;
    private texts: number = 0;

    /**
     * 
     * @param data BeeDesign
     * @returns UnlayerDesign
     */
    fromDesign = (data: BeeDesign): UnlayerDesign => this.getDesign(data as BeeDesign);
    /**
     * 
     * @param data string @description Beefee url encode string
     * @returns UnlayerDesign
     */
    fromString(data: string): UnlayerDesign {

        let design = {} as UnlayerDesign | BeeDesign;

        if (typeof data === 'string') {

            try {
                design = JSON.parse(decodeURIComponent(data));
            }
            catch (error) {
                design = JSON.parse(unescape(data));
            }

        }

        if (!Object.keys(design).includes("page"))
            return design as UnlayerDesign;
        else
            return this.getDesign(design as BeeDesign);
    }

    /**
     * 
     * @param data BeeDesign
     * @returns UnlayerDesign
     */
    getDesign(data: BeeDesign) {

        let design = {} as UnlayerDesign;

        if(!data["page"])throw new Error("design must have page");

        Object.entries(data["page"])?.forEach(([key, value]) => {

            switch (key) {
                case "body":

                    design.body = {
                        rows: this.mapBeRow2Unlayer(data["page"]["rows"]),
                        values: this.mapBeStyle2Unlayer(data["page"]["body"].container.style, '', `u_body`) as any
                    };

                    break;
                case "description":
                    design.counters = {
                        u_column: this.columns,
                        u_row: this.rows,
                        u_content_button: this.buttons,
                        u_content_heading: this.headings,
                        u_content_text: this.texts
                    }
                    break;
                case "template":
                    design.schemaVersion = 7;
                    break;
            }
        })
        return design;
    }

    /**
     * 
     * @param rows Row[]
     * @returns UnLayer Row[]
     */
    mapBeRow2Unlayer = (rows: Row[]) => rows.map((r, i) => {
        this.countUnlayerElement("row");
        return {
            cells: this.mapBeCell2Unlayer(r.columns),
            columns: this.mapBeColumn2Unlayer(r.columns),
            values: this.mapBeStyle2Unlayer(r.container.style, '', `u_row_${i + 1}`)
        } as any
    })

    /**
     * 
     * @param columns columns Column[]
     * @returns number[]
     */
    mapBeCell2Unlayer = (columns: Column[]) => columns.map(x => x["grid-columns"]);

    /**
     * 
     * @param columns Column[]
     * @returns Unlayer Column[]
     */
    mapBeColumn2Unlayer = (columns: Column[]) => columns.map((c, i) => {
        this.countUnlayerElement("column");
        return {
            contents: this.mapBeModule2Unlayer(c.modules),
            values: this.mapBeStyle2Unlayer(c.style, '', `u_column_${i + 1}`),
        }
    });
    /**
     * 
     * @param modules Module[]
     * @returns Unlayer Content[]
     */
    mapBeModule2Unlayer = (modules: Module[]) => modules.map((m, i) => {
        this.countUnlayerElement(m.type.split('-')[m.type.split('-').length - 1]);
        return {
            type: m.type.split('-')[m.type.split('-').length - 1],
            values: this.mapBeDescriptor2Unlayer(m.descriptor, `u_content_${m.type.split('-')[m.type.split('-').length - 1]}_${i + 1}`)
        }
    })
    /**
     * 
     * @param descriptor Descriptor
     * @returns Unlayer Values
     */
    mapBeDescriptor2Unlayer = (descriptor: Descriptor, id_type: string) => Object.assign({}, {
        ...descriptor.computedStyle,
        ...this.mapBeStyle2Unlayer(descriptor.style),
        ...this.mapBeStyle2Unlayer(descriptor?.text?.style ?? descriptor?.button?.style, descriptor?.text?.html ?? descriptor?.button?.label, id_type),
        ...descriptor?.text?.computedStyle,
        ...this.mapImage2Unlayer(descriptor?.image?.src),
        ...this.mapButton2Unlayer(descriptor?.button?.href, descriptor?.button?.style)

    });
    /**
     * 
     * @param style Style
     * @param text html
     * @returns Unlayer Values
     */
    mapBeStyle2Unlayer = (style: Style, text: string = '', id_type?: string) => style ? Object.assign({}, {
        containerPadding: style?.padding,
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
            htmlClassNames: id_type?.replace(/_\d/g, "")
        },
        selectable: true,
        draggable: true,
        duplicatable: true,
        deletable: true,
        hideable: false,
        text: text,
        size: {
            autoWidth: true,
            width: style?.width
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
        columns: id_type?.includes("column"),
        columnsBackgroundColor: '',
        hideDesktop: false,
    }) : {};
    /**
     * 
     * @param color string
     * @returns String
     */
    mapColor2Unlayer = (color: string) => color === "transparent" ? "" : color;

    /**
     * 
     * @param type String @description unlayer element type
     */
    countUnlayerElement(type: string): void {
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
    /**
     * 
     * @param src 
     * @param width 
     * @param height 
     * @returns 
     */
    mapImage2Unlayer = (src: string, width: string = "auto", height: string = "auto") => Object.assign({}, {
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
    mapButton2Unlayer = (href: string, style: Style) => Object.assign({}, {
        ...this.mapButtonColors(style),
        ...this.mapLink(href)
    });

    /**
     * 
     * @param style 
     * @returns 
     */
    mapButtonColors = (style: Style) => Object.assign({}, {
        buttonColors: {
            ...this.mapBeStyle2Unlayer(style),
            backgroundColor: "#3AAEE0",
            hoverColor: "#FFFFFF",
            hoverBackgroundColor: "#3AAEE0",
        }
    });

    /**
     * 
     * @param href 
     * @returns 
     */
    mapLink = (href: string) => Object.assign({}, {
        href: {
            name: "web",
            values: {
                href: href,
                target: "_blank"
            }
        }
    });


}





