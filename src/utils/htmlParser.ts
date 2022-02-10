import { jsdomScript, context } from "../../script/jsdom";


/**
 *
 */



export function parseHtml(html: string): HTMLBodyElement | null {

    if (typeof window === "undefined") {

        try {

            jsdomScript.runInContext(context);
            return context.jsdom(require, html);

        } catch (e: any) {

            throw new Error(e.message);
        }

    }
    else {

        return new DOMParser().parseFromString(html, "text/html").querySelector("body");
    }
}

export function parseRows(body: HTMLBodyElement | null) {
    const children = Array.from(body?.children ?? []).filter(x => x.tagName.toUpperCase() != "SCRIPT" && x.tagName.toUpperCase() != "STYLE");
    if (children.length > 1) return Array.from(children);
    let a = children[0];
    if (a) {

        if (a?.children.length > 1) return Array.from(a.children);
        let b = a?.children[0]

        if (b) {

            if (b?.children.length > 1) return Array.from(b.children);
            let c = b?.children[0];
            if (c) {

                if (c?.children.length > 1) return Array.from(c.children)
                let d = c?.children[0];

                if (d?.children.length > 1) return Array.from(d.children);

                return parseParentChildren(d)

            }

            return parseParentChildren(b)
        }

        return parseParentChildren(a);
    }

    return [];
}

export function parseParentChildren(element: Element) {
    return Array.from(element?.parentElement?.children ?? []);
}


export function parseColumns(row: Element, hasMultipleCells: boolean) {

    return Array.from(hasMultipleCells ? row.children[0]?.children[0]?.children ?? row.children[0]?.children : row.children);
}


export function parseInlineStyle(element: Element): any {
    let style = {};
    const style_ = element.getAttribute("style");
    style_?.split(";").forEach(x => {
        const key = x.split(":")[0];
        const value = x.split(":")[1];
        Object.assign(style, { [key]: value });
    });

    return style;
}