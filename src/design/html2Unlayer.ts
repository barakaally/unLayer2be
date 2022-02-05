import { UnlayerDesign } from "../model/unlayer.model";
import { JSDOM } from 'jsdom';

export class Html2Unlayer {

    from(data: string) {

        let design = {} as UnlayerDesign;
        const body = this.getHtml(data).querySelector("body");

        design.body = {
            rows: Array.from(body?.children[0].children[0].children[0].children[0].children ?? []).map((row: any) => {
                return {
                    cells: this.getCells(Array.from(row.children[0].children)),
                    columns: this.hasMultipleCell(Array.from(row.children[0].children)) ? this.getColumns(row.children[0].children[0].children) : this.getColumns(row.children),
                    values: this.getStyle(row.style, '', `u_row_${1}`) as any
                }
            }),
            values: this.getStyle(body?.style, '', `u_body`) as any
        };

        return design;
    }

    getHtml = (html: string) => new JSDOM(html).window.document;

    /**
    * 
    * @param columns columns Column[]
    * @returns number[]
    */
    getCells = (columns: any[]) =>
        columns.map(x => Array.from(x.children)?.map((y: any) => Number(y.style._values["min-width"].replace(/[a-zA-Z]+/g, ""))))[0];

    hasMultipleCell = (columns: any[]) => this.getCells(columns).length > 1;

    getColumns = (rows: any[]) => Array.from(rows).map((column: any, i) => {
        return {
            contents: this.getContents(column) as any[],
            values: this.getStyle(column?.style, '', `u_column_${i}`) as any,
        }
    });

    getContents = (column: any) => Array.from(column.children).map((content: any, i) => {
        return {
            type: "text",
            values: this.getStyle(content.style, content.outerHTML, `u_content_${i}`) as any
        }
    });

    /**
    * 
    * @param style Style
    * @param text html
    * @returns Unlayer Values
    */
    getStyle = (style: any, text: string = '', id_type?: string) => style ? Object.assign({}, {
        containerPadding: style?.padding,
        color: style["color"],
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