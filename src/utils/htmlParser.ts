export function parseHtml(html: string): HTMLBodyElement | null {

    if (typeof window === "undefined") {

        try {

            var dom = require("jsdom");
            return new dom.JSDOM(html).window.document.querySelector("body");

        } catch (e: any) {

            throw new Error(e.message);
        }

    }
    else {

        return new DOMParser().parseFromString(html, "text/html").querySelector("body");
    }
}

export function parseRows(body: HTMLBodyElement | null) {

    return Array.from(
        findChildren(
            Array.from(body?.children ?? [])
                .filter(x => x.tagName.toUpperCase() != "SCRIPT" && x.tagName.toUpperCase() != "STYLE")));
}

export function findChildren(children: any[], isContent: boolean = false): any[] {

    if (
        (
            children.length == 1 &&
            children[0].childElementCount == 1 &&
            children[0]?.children[0]?.childElementCount == 1 &&
            !isContent
        ) ||
        (
            children.length == 1 &&
            isContent
        )
    ) {

        return findChildren(children[0]?.children, isContent);
    }

    return children;

}

export function parseParentChildren(element: Element) {
    return Array.from(element?.parentElement?.children ?? []);
}


export function parseColumns(row: Element, hasMultipleCells: boolean) {

    return Array.from(
        hasMultipleCells ?
            row.children[0]?.children[0]?.children ?? row.children[0]?.children :
            row.children);
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