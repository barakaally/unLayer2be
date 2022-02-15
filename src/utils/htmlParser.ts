const CONTENTS = ["P", "HR"];
const INLINES = ["STRONG", "EM", "BR"];

export function parseHtml(html: string): HTMLBodyElement | null {

    if (typeof window === "undefined") {

        try {

            const dom = require("jsdom");
            const document = new dom.JSDOM(html).window.document;
            globalThis.document = document;
            return document.querySelector("body");

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
        parseChildren(
            Array.from(body?.children ?? [])
                .filter(
                    x => x.tagName.toUpperCase() != "SCRIPT" &&
                        x.tagName.toUpperCase() != "STYLE")
        ));
}

export function parseChildren(children: any[], isContent = false, parent: any = null): any[] {

    if (
        children.length == 1 &&
        children.length == 1 &&
        children[0].tagName.toUpperCase() != "A" &&
        !CONTENTS.includes(children[0]?.tagName.toUpperCase()) &&
        !INLINES.includes(children[0]?.tagName.toUpperCase()) &&
        ((isContent && isSubElement(children[0])) ||
            (isContent && children[0]?.querySelector("img")) ||
            (!isContent))) {

        return parseChildren(
            children[0]?.children,
            isContent,
            children[0]);
    }

    if (
        children.length == 1 &&
        children[0].tagName.toUpperCase() == "A"
    ) {

        return Array.from(
            addContainer(children[0].parentElement).children)
            .map((x: any) => isSubElement(x) ? addContainer(x) : x);
    }

    if (!children.length && parent) {
        return Array.from(
            addContainer(parent).children)
            .map((x: any) => isSubElement(x) ? addContainer(x) : x);
    }


    if (CONTENTS.some(x =>
        Array.from(children).map(y =>
            y.tagName.toUpperCase()).includes(x))) {

        return [addContainer(children[0].parentElement)];
    }

    if (INLINES.some(x =>
        Array.from(children).map(y =>
            y.tagName.toUpperCase()).includes(x))) {

        return Array.from(children[0].parentElement);
    }

    return Array.from(children).map(x =>
        isSubElement(x) ?
            addContainer(x) :
            x);

}


export function isSubElement(element: Element) {

    return ["IMG", "SPAN", "TR", "TD", "TBODY", "TABLE", "A", "P", "H1", "H2", "H3", "H4", "H5", "H6"].
        some(x =>
            (x == element?.tagName?.toUpperCase()) ||
            (x == element?.parentElement?.tagName?.toUpperCase())
        );
}


export function addContainer(element: Element): any {
    let container = document.createElement("div");
    container.setAttribute("class", `unlayer2be`);
    container.innerHTML = element.outerHTML;
    element.parentNode?.replaceChild(container, element);
    return container;

}

export function parseColumns(row: Element, hasMultipleCells = false): any[] {

    return Array.from(
        hasMultipleCells ?
            row?.children[0]?.children[0]?.children[0]?.children ?? [] :
            row?.children).map(x => isSubElement(x) ? addContainer(x) : x);
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