export class BeeDesign {
    page: Page
}

export class Page {
    body: Body;
    description: string;
    rows: Row[];
    template: Template;
    title: string;
}

export class Template {
    name: string;
    type: string | "basic";
    version: string
}

export class Body {
    container: Container;
    content: Content;
    type: string | "mailup-bee-page-properties";
    webFonts: []
}

export class Row {
    columns: Column[];
    container: Container;
    content: Content;
    locked: boolean;
    type: string | "one-column-empty"
}

export class Container {
    style: Style | any
}

export class Module {
    descriptor: Descriptor;
    locked: boolean;
    type: string | "mailup-bee-newsletter-modules-empty" | "mailup-bee-newsletter-modules-text"
}

export class Column {
    "grid-columns": number;
    modules: Module[];
    style: Style | any
}


export class Content {
    computedStyle: ComputedStyle | any
    style: Style | any
}

export class ComputedStyle {
    linkColor: string;
    messageBackgroundColor: string;
    messageWidth: string;
    hideContentOnDesktop: boolean;
    hideContentOnMobile: boolean;
    rowColStackOnMobile: boolean
}

export class Descriptor {
    computedStyle: ComputedStyle | any;
    style: Style | any;
    text: Text;
    image: {
        alt: string | "Image",
        href: string,
        src: string
    };
    button:{
        href: string,
        label:string,
        style:Style
    }
}

export class Text {
    computedStyle: ComputedStyle | any;
    html: string;
    style: Style | any
}

export class Style {
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