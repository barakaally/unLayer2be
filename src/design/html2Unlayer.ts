import { UnlayerDesign } from "../model/unlayer.model";
import { parseColumns, parseHtml, parseInlineStyle, parseRows, parseChildren } from "../utils/htmlParser";

export class Html2Unlayer {
    private columns: number = 0;
    private rows: number = 0;
    private headings: number = 0;
    private buttons: number = 0;
    private texts: number = 0;
    private images: number = 0;
    private menus: number = 0;
    body: HTMLBodyElement | null;


    /**
     *
     */
    constructor(data: any) {
        this.body = parseHtml(data);

    }

    getDesign() {

        let design = {} as UnlayerDesign;

        design.body = {

            rows: parseRows(this.body).map((row: any, i) => {
                this.countElement("row");
                const hasMultipleCells = this.hasMultipleCell(Array.from(row.children[0]?.children ?? []));
                const columnsBackgroundColor = this.getColor(row?.children[0]?.children[0]?.style["background-color"]);
                const style = row?.children[0]?.style;

                return {
                    cells: this.getCells(Array.from(hasMultipleCells ? row.children[0]?.children : row.children)),
                    columns: this.getColumns(parseColumns(row, hasMultipleCells)),
                    values: {
                        ...this.getStyle(style, '', `u_row_${i + 1}`) as any,
                        columnsBackgroundColor
                    }
                }
            }),
            values: this.getStyle(this.body?.style, '', `u_body`) as any
        };

        design.counters = {
            u_column: this.columns,
            u_row: this.rows,
            u_content_button: this.buttons,
            u_content_heading: this.headings,
            u_content_text: this.texts,
            u_content_image: this.images,
            u_content_menu: this.menus
        }

        design.schemaVersion = 7;

        return design;
    }

    /**
    * 
    * @param columns columns Column[]
    * @returns number[]
    */
    getCells = (columns: any[]) => {

        const cells = columns?.map(x => Array.from(parseChildren(x.children))
            ?.map((y: any) => y.classList.contains("2be") ? -1 : Number((y?.style["min-width"] ?? y?.style["width"])?.replace(/[a-zA-Z]+/g, ""))));

        return this.calculateColumnsRatio(cells)
    }

    hasMultipleCell = (columns: any[]) => this.getCells(columns).length > 1;

    getColumns = (columns: any[]) => Array.from(columns).map((column: any, i) => {
        this.countElement("column");
        const style = column?.style;
        const padding = Array.from(parseChildren(column.children,true))[0].parentElement.parentElement.style["padding"];
        style.padding = padding ? padding :style.padding;
        return {
            contents: this.getContents(column) as any[],
            values: this.getStyle(style, '', `u_column_${i + 1}`) as any,
        }
    });

    calculateColumnsRatio = (cells: any[][]) => {

        return cells[0]?.includes(-1) ? [12] :
            cells[0]?.length ? cells[0]?.map((x: any) =>
                (!isNaN(x) && x) ? Math.round((x / Math.min(...cells[0].map((y: any) => y == 0 ? 12 : y)))) : 12) :
                [12];
    }

    getContents = (column: any) => Array.from(parseChildren(column.children,true)).map((content: any, i) => {
        const type = this.getContentType(content);
        this.countElement(type);
        return {
            type: type,
            values: {
                ...{
                    ...this.getStyle(content.style, content.outerHTML, `u_content_${type}_${i + 1}`) as any,
                    containerPadding: "",
                },
                ...{
                    src: {
                        url: content?.querySelector("img")?.src,
                        width: "auto",
                        height: "auto"
                    }
                }
            }
        }
    });

    /**
    * 
    * @param style Style
    * @param text html
    * @returns Unlayer Values
    */
    getStyle = (style: any, text: any = '', id_type?: string) => style ? Object.assign({}, {
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
        columns: id_type?.includes("column"),
        hideDesktop: false,
    }) : {};

    /**
     * 
     * @param color string
     * @returns String
     */
    getColor = (color: string) => color === "transparent" ? "" : color;


    /**
     * 
     * @param type String @description unlayer element type
     */
    countElement(type: string): void {
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

    getContentType = (content: HTMLElement): any => {

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
    }
}