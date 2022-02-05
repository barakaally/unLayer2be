export class UnlayerDesign {
    counters: Counter;
    body: Body;
    schemaVersion: number;
}

export class Counter {
    u_column: number;
    u_row: number;
    u_content_button: number;
    u_content_heading: number;
    u_content_text: number
}

export class Body {
    rows: Row[];
    values: Values
}

export class Row {
    cells: Array<Number>;
    columns: Column[];
    values: Values
}

export class Column {
    contents: Content[];
    values: Values
}
export class Content {
    type: "heading" | "text" | "html" | "button" | "body" | "image";
    values: Values
}

export class Values {
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

export class FontFamily {
    label: string;
    value: string;
}

export class LinkStyle {
    inherit: boolean;
    linkColor: string;
    linkHoverColor: string;
    linkUnderline: boolean;
    linkHoverUnderline: boolean
}

export class Meta {
    htmlID: string;
    htmlClassNames: string
}

export class Href {
    name: "web";
    values: {
        href: string;
        target: "_blank" | "self"
    }
}