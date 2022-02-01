export class Unlayerhtml {

    /**
    * 
    * @param style Style
    * @param text html
    * @returns Unlayer Values
    */
    htmlStyle2Unlayer = (style: any, text: string = '', id_type?: string) => style ? Object.assign({}, {
        containerPadding: style?.padding,
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