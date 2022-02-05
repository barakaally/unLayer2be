import { UnlayerDesign } from "../model/unlayer.model";
import { HtmlParser } from "../utils/htmlParser";

export class Html2Unlayer {

    from(data: string) {

        let design = {} as UnlayerDesign;

        const body = HtmlParser.parse(data).querySelector("body");

        design.body = {
            rows: Array.from(body?.children[0].children[0].children[0].children[0].children ?? []).map((row: any, i) => {
                const hasMultipleCells = this.hasMultipleCell(Array.from(row.children[0].children))
                return {
                    cells: this.getCells(Array.from(row.children[0].children)),
                    columns: hasMultipleCells ? this.getColumns(row.children[0].children[0].children) : this.getColumns(row.children),
                    values: {
                        ...this.getStyle(row.style, '', `u_row_${i + 1}`) as any,
                        columnsBackgroundColor: hasMultipleCells ? this.getColor(row.children[0].style["background-color"]) : this.getColor(row.style["background-color"]),
                    }
                }
            }),
            values: this.getStyle(body?.style, '', `u_body`) as any
        };

        return design;
    }


    /**
    * 
    * @param columns columns Column[]
    * @returns number[]
    */
    getCells = (columns: any[]) => {

        const cells = columns.map(x => Array.from(x.children)
            ?.map((y: any) => Number(y.style._values["min-width"].replace(/[a-zA-Z]+/g, ""))))[0];

        return cells.map(x => Math.round(x / Math.min(...cells)));

    }

    hasMultipleCell = (columns: any[]) => this.getCells(columns).length > 1;

    getColumns = (rows: any[]) => Array.from(rows).map((column: any, i) => {
        return {
            contents: this.getContents(column) as any[],
            values: this.getStyle(column?.style, '', `u_column_${i + 1}`) as any,
        }
    });

    getContents = (column: any) => Array.from(column.children).map((content: any, i) => {
        return {
            type: this.getContentType(content),
            values: {
                ...this.getStyle(content.style, content.outerHTML, `u_content_${this.getContentType(content)}_${i + 1}`) as any,
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
        containerPadding: style?.padding,
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

    getContentType = (content: HTMLElement) => {

        if (content.querySelector("img")) {
            return "image";
        }

        return "text";
    }
}