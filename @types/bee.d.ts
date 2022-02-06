export declare class BeeDesign {
    page: Page
}

export declare class Page {
    body: Body;
    description: string;
    rows: Row[];
    template: Template;
    title: string;
}

export declare class Template {
    name: string;
    type: string | "basic";
    version: string
}

export declare class Body {
    container: Container;
    content: Content;
    type: string | "mailup-bee-page-properties";
    webFonts: []
}

export declare class Row {
    columns: Column[];
    container: Container;
    content: Content;
    locked: boolean;
    type: string | "one-column-empty"
}

export declare class Container {
    style: Style | any
}

export declare class Module {
    descriptor: Descriptor;
    locked: boolean;
    type: string;
}

export declare class Column {
    "grid-columns": number;
    modules: Module[];
    style: Style | any
}


export declare class Content {
    computedStyle: ComputedStyle | any
    style: Style | any
}

export declare class ComputedStyle {
    linkColor: string;
    messageBackgroundColor: string;
    messageWidth: string;
    hideContentOnDesktop: boolean;
    hideContentOnMobile: boolean;
    rowColStackOnMobile: boolean
}

export declare class Descriptor {
    computedStyle: ComputedStyle | any;
    style: Style | any;
    text: Text;
    image: Image;
    button: Button
}

export declare class Text {
    computedStyle: ComputedStyle | any;
    html: string;
    style: Style | any
}

export declare class Button {
    href: string;
    label: string;
    style: Style;
}

export declare class Image {
    alt: string | "Image";
    href: string;
    src: string;
}

export declare class Style {
    color: string;
    "font-family": string;
    "font-size": string;
    "text-align": string;
    "background-color": string;
    "background-image": string;
    "background-position": string;
    "background-repeat": string;
    "width": string;
    "border-bottom": string;
    "border-left": string;
    "border-right": string;
    "border-top": string;
    "padding-bottom": string;
    "padding-left": string;
    "padding-right": string;
    "padding-top": string;
    "line-height": string;
    "linkColor": string;
    "link-style": string;
    "border-radius": string;
    height: number;
    hideContentOnMobile: boolean;
    padding: any;
    align: any;

}