import { BeeDesign, Body, Column, ComputedStyle, Descriptor, Module, Row, Style } from "../model/bee.model";
import { Body as UBody } from "../model/unlayer.model";
import { UnlayerDesign } from "../model/unlayer.model";

export class UnlayerEmailJson {
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

        Object.entries(data["page"]).forEach(([key, value]) => {

            switch (key) {
                case "body":

                    design.body = {
                        rows: this.mapBeRow2Unlayer(data["page"]["rows"]),
                        values: this.mapBeStyle2Unlayer(data["page"]["body"].container.style, '', `u_body`) as any
                    };

                    break;
                case "description":
                    design.counters = {
                        u_column: 1,
                        u_row: 1,
                        u_content_button: 1,
                        u_content_heading: 1,
                        u_content_text: 1
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
        ...descriptor.style,
        ...this.mapBeStyle2Unlayer(descriptor?.text?.style, descriptor?.text?.html, id_type),
        ...descriptor?.text?.computedStyle,
        ...{
            src: {
                height: "auto",
                width: "auto",
                url: descriptor?.image?.src
            }
        }

    });
    /**
     * 
     * @param style Style
     * @param text html
     * @returns Unlayer Values
     */
    mapBeStyle2Unlayer = (style: Style, text: string = '', id_type?: string) => style ? Object.assign({}, {
        containerPadding: style?.padding,
        headingType: "",
        fontFamily: style["font-family"] ? {
            label: "Popcorn",
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
            hoverColor: style?.linkColor,
            hoverBackgroundColor: style["background-color"]
        },
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
        columns: id_type?.includes("column"),
        columnsBackgroundColor: '',
        hideDesktop: false,
    }) : {};
}





