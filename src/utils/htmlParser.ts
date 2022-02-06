import { JSDOM } from "jsdom";

export class HtmlParser {

    static document: Document;

    static parseBody = (html: string) => this.document = new JSDOM(html).window.document;

    static parseRows = (body: HTMLBodyElement | null) => {

        let a = Array.from(body?.children ?? []).filter(x => x.tagName.toUpperCase() != "SCRIPT")[0];

        if (a) {

            if (a?.children.length > 1) return this.parseParentChildren(a);
            let b = a?.children[0]

            if (b) {
                if (b?.children.length > 1) return this.parseParentChildren(b);
                let c = b?.children[0];
                if (c) {

                    if (c?.children.length > 1) return this.parseParentChildren(c);
                    let d = c?.children[0];

                    if (d?.children.length > 1) return Array.from(d.children);
                    return this.parseParentChildren(d)

                }

                c = this.document.createElement('div');
                const d = this.document.createElement('div');
                a.append(c);
                c.append(d);
                d.append(b)
                return Array.from(d.children);
            }

            b = this.document.createElement('div');
            const c = this.document.createElement('div');
            const d = this.document.createElement('div');
            b.append(c);
            c.append(d);
            d.append(a);
            return Array.from(d.children);
        }

        a = this.document.createElement('div');
        const b = this.document.createElement('div');
        const c = this.document.createElement('div');
        const d = this.document.createElement('div');
        body?.append(a)
        a.append(b);
        b.append(c);
        c.append(d);
        return [];
    }

    static parseParentChildren = (element: Element) => Array.from(element?.parentElement?.children ?? []);

    static parseColumns = (row: Element, hasMultipleCells: boolean) =>
       Array.from(hasMultipleCells ? row.children[0]?.children[0]?.children ?? row.children[0]?.children : row.children);

}