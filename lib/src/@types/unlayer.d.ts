export declare class UnlayerDesign {
    counters: Counter;
    body: Body;
    schemaVersion: number;
}

export declare class Counter {
    u_column: number;
    u_row: number;
    u_content_button: number;
    u_content_heading: number;
    u_content_text: number
}

export declare class Body {
    rows: Row[];
    values: Values
}

export declare class Row {
    cells: Array<Number>;
    columns: Column[];
    values: Values
}

export declare class Column {
    contents: Content[];
    values: Values
}
export declare class Content {
    type: "heading" | "text" | "html" | "button" | "body" | "image";
    values: Values
}

export declare class Values {
    containerPadding: string;
    headingType: string;
    fontFamily: FontFamily;
    fontSize: string;
    textAlign: string;
    lineHeight: string;
    linkStyle: LinkStyle
    displayCondition?: string;
    _meta: Meta;
    selectable: boolean;
    draggable: boolean;
    duplicatable: boolean;
    deletable: boolean;
    hideable: boolean;
    text: string;
    href: Href;
    buttonColors: {
        color: string;
        backgroundColor: string;
        hoverColor: string;
        hoverBackgroundColor: string
    };
    size: {
        autoWidth: boolean;
        width: string
    }
    padding: string;
    border: {};
    borderRadius: string
    calculatedWidth: number;
    calculatedHeight: number;
    textColor: string;
    backgroundColor: string;
    backgroundImage: {
        url: string;
        fullWidth: boolean;
        repeat: boolean;
        center: boolean;
        cover: boolean
    };
    contentWidth: string;
    contentAlign: string;
    preheaderText: string;
    columns: boolean;
    columnsBackgroundColor: string;
    hideDesktop: boolean;
    src: {
        height: number
        url: string;
        width: number;
    }
}

export declare class FontFamily {
    label: string;
    value: string;
}

export declare class LinkStyle {
    inherit: boolean;
    linkColor: string;
    linkHoverColor: string;
    linkUnderline: boolean;
    linkHoverUnderline: boolean
}

export declare class Meta {
    htmlID: string;
    htmlClassNames: string
}

export declare class Href {
    name: "web";
    values: {
        href: string;
        target: "_blank" | "self"
    }
}